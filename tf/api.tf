# V1 only has router, v2 will have KV, v3 R2
resource cloudflare_worker_script "hooks" {
  name = "hooks"
  content = file("../dist/dist.js")

  kv_namespace_binding {
    name = "HOOKS_TIMERS"
    namespace_id = cloudflare_workers_kv_namespace.hooks_timers.id
  }

  dynamic "secret_text_binding" {
    for_each = var.hooks_environment

    content {
      # Please note that for some reason dynamic blocs 
      # use the setting name instead of "each"
      name = secret_text_binding.key
      text = secret_text_binding.value
    }
  }
}

resource cloudflare_worker_route "hooks" {
  zone_id = var.cloudflare_zone_id
  pattern = "hooks.jocolina.com/*"
  script_name = cloudflare_worker_script.hooks.name
}
