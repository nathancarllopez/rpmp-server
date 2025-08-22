# RPMP Server

RPMP Server is a backend service built with TypeScript and Express designed to manage and serve resources for the RPMP Dashboard (link to repo below). It provides APIs for authentication via Supabase, as well as pdf generation tools for processing food orders and creating timecards. 

## Features

- **Authentication**: Allows selected users (see requireAdmin.ts in middleware) to create and delete users.
- **Order Processing**: Generates pdfs for order processing, e.g., a shopping list and a cook sheet with ingredient weights for kitchen staff.
- **Timecards**: Creates a pdf with timecards (showing hours worked, pay earned, etc.) with one timecard on each page.

## Demo and Client Side Repo

The repository for the client side code can be found [here](https://github.com/nathancarllopez/rpmp-client).

A demo of the client side application can be found [here]() hosted via Netlify. This repo is hosted via Render.