# Jira Release/Archive Action

[![CI](https://github.com/Justin-JHG/jira-release-actions/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Justin-JHG/jira-release-actions/actions/workflows/ci.yml)

This GitHub Action connects your CI and your Jira instance by creating release (Fix Version) and assigning Jira issues to the release as part of your CI process.

- Create a Jira release, release date supports timezone overwrite.
- Assign Jira Issues to release.
- Archive an existing Jira release.

## Usage

### Example workflow

```yaml
jobs:
  release-fix-version:
    name: Release Jira Fix Version
    runs-on: ubuntu-latest
    steps:
      uses: justin-jhg/jira-release-actions@v2
      with:
        jira_base_url: ${{ secrets.JIRA_BASE_URL }}
        jira_user_email: ${{ secrets.JIRA_USER_EMAIL }}
        jira_api_token: ${{ secrets.JIRA_API_TOKEN }}
        jira_project: CI
        release_name: v9.0.2
        tickets: CI-123,CI-456
        release: true
        archive: false
        time_zone: Australia/Melbourne
```

---

## Action Spec

### Inputs

| Name            | Description                                                                                                                                          | Required? | Type    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| jira_base_url   | URL of Jira instance. Example: `https://<yourdomain>.atlassian.net`                                                                                  | Yes       | String  |
| jira_api_token  | **Access Token** for Authorization. Example: `HXe8DGg1iJd2AopzyxkFB7F2` ([How To](https://confluence.atlassian.com/cloud/api-tokens-938839638.html)) | Yes       | String  |
| jira_user_email | Email of the user for which **Access Token** was created for. Example: `human@example.com`                                                           | Yes       | String  |
| jira_project    | Key of the Jira project                                                                                                                              | Yes       | String  |
| release_name    | Name of the release (Fix Version)                                                                                                                    | Yes       | String  |
| time_zone       | Timezone for release date to be set, e.g. Australia/Melbourne, default is UTC time                                                                   | No        | String  |
| release         | Mark Jira fix version as released. Defaults to false.                                                                                                | No        | Boolean |
| archive         | Mark Jira fix version as archived. Defaults to false.                                                                                                | No        | Boolean |
| tickets         | Comma-separated list of Jira Issue Keys to include in the release. Defaults to ''.                                                                   | No        | String  |

### Outputs

| Name       | Description                           |
| ---------- | ------------------------------------- |
| release_id | ID of the release, created or updated |

## Reference

- [Jira Basic authentication](https://developer.atlassian.com/server/jira/platform/basic-authentication/)
- [Repository the code was forked from](https://github.com/StalemateInc/jira-release-action)
- [GitHub Actions: TypeScript Action](https://github.com/actions/typescript-action)
- [ECMAScript module (ESM)](https://nodejs.org/api/esm.html)
- [Rollup](https://rollupjs.org)
- [Vercel NCC](https://github.com/vercel/ncc)
