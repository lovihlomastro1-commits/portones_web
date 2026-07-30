import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";

type Servicio = {
  servicio: string;
};

type Zona = {
  slug_zona: string;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portotones.online";
  const servicios = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "servicios.json"), "utf8")) as Servicio[];
  const zonas = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "zonas.json"), "utf8")) as Zona[];

  const serviceRoutes = servicios.flatMap((servicio) =>
    zonas.map((zona) => ({ url: `${baseUrl}/${servicio.servicio}/${zona.slug_zona}`, lastModified: new Date() }))
  );

  return [
    { url: baseUrl, lastModified: new Date() },
    ...serviceRoutes,
  ];
}

