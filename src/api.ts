import { debug } from "@actions/core";
import axios from "axios";
import {
  CreateVersionParams,
  JiraProject,
  JiraVersion,
  UpdateVersionParams,
} from "./types.js";
import { toMoreDescriptiveError } from "./utils.js";

export class API {
  authToken: string;
  projectName: string;
  domain: string;

  constructor(email: string, token: string, name: string, domain: string) {
    this.authToken = `${Buffer.from(`${email}:${token}`).toString("base64")}`;
    this.projectName = name;
    this.domain = domain;
  }

  async createVersion(body: CreateVersionParams): Promise<JiraVersion> {
    try {
      const response = await axios.post<JiraVersion>(
        `${this.domain}/rest/api/3/version`,
        body,
        {
          headers: this._headers(),
        },
      );

      return response.data;
    } catch (error: unknown) {
      throw toMoreDescriptiveError(error);
    }
  }

  async updateVersion(
    id: string,
    body: UpdateVersionParams,
  ): Promise<JiraVersion> {
    try {
      debug(JSON.stringify(body));

      const response = await axios.put<JiraVersion>(
        `${this.domain}/rest/api/3/version/${id}`,
        body,
        {
          headers: this._headers(),
        },
      );

      return response.data;
    } catch (error: unknown) {
      throw toMoreDescriptiveError(error);
    }
  }

  async updateIssue(
    ticket_id: string,
    version_id: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Check if issue exists first
      await axios.get(`${this.domain}/rest/api/3/issue/${ticket_id}`, {
        headers: this._headers(),
      });
    } catch (error: unknown) {
      // If issue doesn't exist, return early without error
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        debug(`Issue ${ticket_id} not found, skipping update`);
        return { success: false, error: "Issue not found" };
      }
      // For other errors during issue check, also return gracefully
      debug(`Error checking issue ${ticket_id}: ${error}`);
      return {
        success: false,
        error: `Error checking issue: ${error instanceof Error ? error.message : String(error)}`,
      };
    }

    try {
      await axios.put(
        `${this.domain}/rest/api/3/issue/${ticket_id}`,
        {
          update: {
            fixVersions: [
              {
                add: { id: version_id },
              },
            ],
          },
        },
        { headers: this._headers() },
      );

      return { success: true };
    } catch (error: unknown) {
      debug(`Error updating issue ${ticket_id}: ${error}`);
      return {
        success: false,
        error: `Error updating issue: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  async loadProject(): Promise<JiraProject> {
    try {
      const response = await axios.get<JiraProject>(
        `${this.domain}/rest/api/3/project/${this.projectName}?properties=versions,key,id,name`,
        { headers: this._headers() },
      );

      return response.data;
    } catch (error: unknown) {
      throw toMoreDescriptiveError(error);
    }
  }

  _headers(): {
    Authorization: string;
    Accept: string;
    "Content-Type": string;
  } {
    return {
      Authorization: `Basic ${this.authToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }
}
