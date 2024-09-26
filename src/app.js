import e from "express";
import cors from "cors";

import AuthRoutesV1 from "./v1/routes/auth.routes.js";
import UserRoutesV1 from "./v1/routes/user.routes.js";

import AuthRoutesV2 from "./v2/routes/auth.routes.js";
import UserRoutesV2 from "./v2/routes/user.routes.js";

const app = e();

app.use(cors({ origin: '*', methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']}));
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

// Rutas V1
app.use("/api/v1", AuthRoutesV1);
app.use("/api/v1/users", UserRoutesV1);

// Rutas V2
app.use("/api/v2", AuthRoutesV2);
app.use("/api/v2/users", UserRoutesV2);

export default app;
