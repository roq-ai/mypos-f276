import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { shoppingCartValidationSchema } from 'validationSchema/shopping-carts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.shopping_cart
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getShoppingCartById();
    case 'PUT':
      return updateShoppingCartById();
    case 'DELETE':
      return deleteShoppingCartById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getShoppingCartById() {
    const data = await prisma.shopping_cart.findFirst(convertQueryToPrismaUtil(req.query, 'shopping_cart'));
    return res.status(200).json(data);
  }

  async function updateShoppingCartById() {
    await shoppingCartValidationSchema.validate(req.body);
    const data = await prisma.shopping_cart.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteShoppingCartById() {
    const data = await prisma.shopping_cart.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
