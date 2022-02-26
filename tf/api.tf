# V1 only has router, v2 will have KV, v3 R2
resource cloudflare_worker_script "hooks" {
  name = "hooks"
  content = file("../dist/dist.js")
}

resource cloudflare_worker_route "hooks" {
  zone_id = var.cloudflare_zone_id
  pattern = "hooks.jocolina.com/*"
  script_name = cloudflare_worker_script.hooks.name
}
