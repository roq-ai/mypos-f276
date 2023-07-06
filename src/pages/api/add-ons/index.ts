import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { addOnValidationSchema } from 'validationSchema/add-ons';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getAddOns();
    case 'POST':
      return createAddOn();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAddOns() {
    const data = await prisma.add_on
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'add_on'));
    return res.status(200).json(data);
  }

  async function createAddOn() {
    await addOnValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.add_on.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
