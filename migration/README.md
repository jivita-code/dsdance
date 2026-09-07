# WordPress content migration

The current WordPress site remains the source of truth until the client verifies this inventory.

1. Run `npm run migration:inventory` with internet access.
2. Review `migration/output/pages.json`, `migration/output/pages.csv`, and `migration/output/media.csv`.
3. Keep all client-provided visible copy unchanged when creating JPanel drafts.
4. Upload or import original media to JPanel and update content records from draft to published only after review.

The script only reads the public WordPress REST API. It never changes the live site.
