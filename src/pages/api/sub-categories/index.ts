import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { subCategoryValidationSchema } from 'validationSchema/sub-categories';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getSubCategories();
    case 'POST':
      return createSubCategory();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSubCategories() {
    const data = await prisma.sub_category
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'sub_category'));
    return res.status(200).json(data);
  }

  async function createSubCategory() {
    await subCategoryValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.food_item?.length > 0) {
      const create_food_item = body.food_item;
      body.food_item = {
        create: create_food_item,
      };
    } else {
      delete body.food_item;
    }
    const data = await prisma.sub_category.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
