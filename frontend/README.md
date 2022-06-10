## Table of Contents

| Contents                         |      Description      |
| :------------------------------- | :--------------------: |
| [basic-setup](#basic-setup)         | basic setup ng backend |
| [storybook setup](#storybook-setup) |   setup ng storybook   |

# BASIC SETUP

1. ```
   cd frontend
   ```
2. ```
   npm install
   ```
3. Create ka ng .env.local file dito sa frontend folder (Make sure naka cd frontend ka)
4. Ilagay mo to sa .env.local or icopy mo yung .env.sample

```env
API_URL=http://localhost:3001
```

8. `npm run dev`

# STORYBOOK SETUP

1. Make sure nasa frontend folder ka
2. `npm run storybook`
3. nasa localhost:6006/ yung storybook
4. Refer ka nalang dito for more info [Introduction to Storybook](https://storybook.js.org/docs/react/get-started/introduction)
5. Nasa frontend/stories yung stories
6. Nasa .storybook yung configuration ng storybook
