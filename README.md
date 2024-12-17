# Unblocker2

Everything you need to host the frontend of Unblocker2

## Description

Unblocker2 is a web proxy for bypassing web filters by redirecting traffic to a remote server then returns the response to the client. This specific web proxy is uses a "proxy" made by Titanium Network called "Ultraviolet". This is only the frontend which is what the user sees when they open the website. Unblocker2 is a "proxy" made in sveltekit which uses a unique design where their are multiple frontends and backends all connected together to reduce the chance a site is blocked.

## Contributing

to contribute fork this and give it a star ⭐
next create a Github codespace and start developing. 
one you are done with your edits create a pull request for me to review. 
if you would like to add another server to the serverpool then open a issue
in the issue tab. You can also contribute the to the amount of precalculated url using this tool: [The tool](https://www.typescriptlang.org/play/?#code/AQ4MwVwOwYwFwJYHsrAKayQEzQCgM5wBOAXMIUQlAOYCUwA3gFCivAJjC4CEF9RaOBCKoKAbhZsQAemnAAomDAIYCDHHSYsVasAC2aGAAsAhlAT49XKEmACs0LGY16TAB2BI3aIicQpaSSkBIRFNGGw0AFUAJQBJAGEkPTcUdVwgqVAKADp8NwAbBDhcAHJSwKyq4BzXN1xcYxMiABp2KCx6AF4APnasYABSYAAmYAB+YABlYh0csCJkhNMiJJxGlZym1ciAQRKABnoAPVH6Mm3K6qkcgCskKjKKzNZaCVYAXyYIqHwkArQOQKSGouAwEXWACIjHA4G58CRZJDaG8gA)

```bash
npm run dev

# Use this to start the server
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

>[!NOTE]
> This comes with the vercel adapter, you can change this in the svelte.config.js
 
