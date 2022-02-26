resource github_repository "repo" {
	name = "hooks"
	description = "A collection of custom webhooks"

	visibility = "public"

	vulnerability_alerts = false
}

resource github_actions_secret "actions_secrets" {
	for_each = var.github_secrets

	repository = github_repository.repo.name

	secret_name = each.key
	plaintext_value = each.value
}
