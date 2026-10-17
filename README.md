# Site Back-End

## Run locally

Set `MONGO_URI` in `.env`, then run:

```sh
npm run dev
```

The API listens on port `3000` by default. `GET /health` reports server and
database status.

## Category and product API

| Method | Path | Result |
| --- | --- | --- |
| GET | `/api/categories` | List categories with their parent |
| GET | `/api/categories/:id` | Read a category |
| POST | `/api/categories` | Create a category (`name`, `slug`, optional `parent`) |
| PUT | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete an unused category |
| GET | `/api/products` | List products with their category |
| GET | `/api/products?category=:id` | Filter products by category |
| GET | `/api/products/:id` | Read a product |
| POST | `/api/products` | Create a product (`name`, `price`, `stock`, `category`) |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

API errors return JSON. Invalid values and schema validation failures return
`400`, duplicate values return `409`, missing records return `404`, and
unexpected failures return `500`.

## Seed sample data

Run `npm run seed` to create 3 categories and 8 products. **This command first
deletes every document in the `Product` and `Category` collections**, so only
run it against a database you are willing to reset.
