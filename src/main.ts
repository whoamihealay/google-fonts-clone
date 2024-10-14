import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";

import db from "./db.json" with { type: "json" };

const port = 3000;

const router = new Router();

router.get("/", (ctx) => {
    const family = ctx.request.url.searchParams.get("family");
    if (!family) {
        ctx.response.status = 400;
        ctx.response.body = "Missing family query param";
        return;
    }
    const font = db.find((f) => f.family === family);

    if (!font) {
        ctx.response.status = 404;
        ctx.response.body = "Font not found";
        return;
    }

    const weight = ctx.request.url.searchParams.get("weight") ?? "400";
    const weights = weight?.split(",");
    const italic = ctx.request.url.searchParams.get("italic");
    const italics = italic?.split(",") || [];    
    const display = ctx.request.url.searchParams.get("display") ?? "swap";

    const variations = font.variations
        .filter((v) => (v.style === "normal" && weights.includes(v.weight)) || (v.style === "italic" && italics.includes(v.weight)));

    const face = variations?.map((w) => {
        return `@font-face {
    font-family: ${family};
    font-display: ${display};
    font-weight: ${w.weight};
    font-style: ${w.style};
    src: ${w.src.map((s) => `url(${s.url}) format('${s.format}')`).join(", ")};
}`;
    });

    ctx.response.headers.set("Content-Type", "text/css");
    ctx.response.body = face.join("\n");
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port });
