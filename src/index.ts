import express, { Request, Response } from "express";
import path from "path";
import json from "./assets/fonts.json";

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req: Request, res: Response) => {
    console.log("Query params:", req.query);
    const data = json as Record<string, any>; // TODO: Type assertion

    const weight = req.query["weight"] as string;
    const family = req.query["family"] as string;

    const wght = weight?.split(",");

    const fonts = wght?.map((w) => {
        const weight = data[family][w];

        return `@font-face {
    font-family: ${family};
    font-weight: ${weight["font-weight"]};
    font-style: ${weight["font-style"]};
    src: ${weight["src"]};
}`;
    });

    res.setHeader("Content-Type", "text/css");
    res.send(fonts.join("\n"));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
