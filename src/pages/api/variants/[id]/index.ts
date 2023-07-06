import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { variantValidationSchema } from 'validationSchema/variants';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.variant
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getVariantById();
    case 'PUT':
      return updateVariantById();
    case 'DELETE':
      return deleteVariantById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVariantById() {
    const data = await prisma.variant.findFirst(convertQueryToPrismaUtil(req.query, 'variant'));
    return res.status(200).json(data);
  }

  async function updateVariantById() {
    await variantValidationSchema.validate(req.body);
    const data = await prisma.variant.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteVariantById() {
    const data = await prisma.variant.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
