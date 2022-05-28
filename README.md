# Stackbit Next.js Starter

Begin a new Stackbit project or learn to add Stackbit to an existing site.

## Getting Started

Get up and running quickly by running the following command:

```txt
npx create-stackbit-app [project-name]
```

Then change into `[project-name]` directory (default: `my-stackbit-site`) and start the Next.js dev server and Stackbit local dev in separate terminal tabs/windows.

```txt
cd [project-name]
npm run dev

# in a separate tab/window
npm run stackbit-dev
```

## Learn the Basics

Follow the [getting started tutorial](https://docs.stackbit.com/getting-started/) while running this project locally to get a feel for how Stackbit works.

Or jump to individual topics [in the docs](https://docs.stackbit.com/).

## Support & Feedback

[Join us on Discord](https://discord.gg/HUNhjVkznH) for community support and to provide feedback to us.

## Changelog

1. Upgrade nextjs project

- Upgrade package manager to yarn v2
- Add typescript support
- Setup jest test environment
- Add netlify.toml
- Set prettier config to `@stackbit/prettier-config`
- Set `buildCommand` in `stackbit.yaml`

