import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { foodItemValidationSchema } from 'validationSchema/food-items';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getFoodItems();
    case 'POST':
      return createFoodItem();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFoodItems() {
    const data = await prisma.food_item
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'food_item'));
    return res.status(200).json(data);
  }

  async function createFoodItem() {
    await foodItemValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.add_on?.length > 0) {
      const create_add_on = body.add_on;
      body.add_on = {
        create: create_add_on,
      };
    } else {
      delete body.add_on;
    }
    if (body?.variant?.length > 0) {
      const create_variant = body.variant;
      body.variant = {
        create: create_variant,
      };
    } else {
      delete body.variant;
    }
    const data = await prisma.food_item.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
