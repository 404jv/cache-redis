import { Request, Response } from "express";
import { createConnection } from "../postgres";
import { getRedis } from "../redisConfig";

export class GetUserInfoController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const userJsonRedis = await getRedis(`user-${userId}`);

    let user = JSON.parse(userJsonRedis);

    if (!user) {
      const clientConnection = await createConnection();

      const { rows } = await clientConnection.query(
        `SELECT * FROM USERS WHERE ID  = $1 LIMIT 1`,
        [userId]
      );

      user = rows[0];
    }

    return response.json(user);
  }
}
