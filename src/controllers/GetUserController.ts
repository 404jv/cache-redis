import { Request, Response } from "express";
import { createConnection } from "../postgres";

export class GetUserInfoController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const clientConnection = await createConnection();

    const { rows } = await clientConnection.query(
      `SELECT * FROM USERS WHERE ID  = $1 LIMIT 1`,
      [userId]
    );

    const user = rows[0];

    return response.json(user);
  }
}
