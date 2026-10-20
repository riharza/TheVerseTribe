import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "next-env.d.ts",
      // Legacy storytelling routes/components (not linked from research nav)
      "src/app/story/**",
      "src/app/blog/**",
      "src/app/discover/**",
      "src/app/explore/**",
      "src/app/forum/**",
      "src/app/writers/**",
      "src/app/write/**",
      "src/app/library/**",
      "src/app/community/**",
      "src/app/search/**",
      "src/app/login/**",
      "src/app/register/**",
      "src/app/profile/**",
      "src/app/for-writers/**",
      "src/components/animations/**",
      "src/components/characters/**",
      "src/components/character/**",
      "src/components/atmosphere/Starfield.tsx",
      "src/components/atmosphere/Fireflies.tsx",
      "src/components/atmosphere/MistLayer.tsx",
      "src/components/atmosphere/AtmosphereWrapper.tsx",
      "src/components/home/CinematicHero.tsx",
      "src/components/home/HeroSection.tsx",
      "src/components/home/BentoFeatured.tsx",
      "src/components/home/ScrollGallery.tsx",
      "src/components/home/GenreConstellation.tsx",
      "src/components/home/WritersMosaic.tsx",
      "src/components/home/StorySections.tsx",
      "src/components/home/CommunityWriters.tsx",
      "src/components/stories/**",
      "src/components/writers/**",
      "src/components/discover/**",
      "src/components/community/**",
      "src/components/comments/**",
      "src/components/reader/**",
      "src/components/blog/**",
      "src/lib/data/mock-data.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
