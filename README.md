This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
- Create a [telegram bot](https://core.telegram.org/widgets/login)
- Replace the script in the `src\pages\auth.tsx`
- Add a data via [Notion API](https://developers.notion.com/)
- Create the .env (.env.local) file with fields: `BOT_TOKEN` (get it in the telegram bot), `NOTION_KEY` (get it in the Notion API) and `NOTION_TABLE_ID` (get it in the link to this table)
- Telegram OAuth don't work with the `localhost`. You can use [ngrok](https://ngrok.com/docs/getting-started/) or similar technology for create a static URL
- Add new URL in the telegram bot using `/setdomain`
- `yarn dev`
- Open [http://localhost:3000](http://localhost:3000) or URL from `ngrok` with your browser to see the result.


## File Structure
Layout folder - contains components like Head, Header, etc.
Pages folder - contains pages and main configuration files
Sections folder - contains infrastructure files for pages
Styles folder - contains main styles
Utils folder - contains tools like api, contexts, routes, etc.
middleware.ts - implements redirections
