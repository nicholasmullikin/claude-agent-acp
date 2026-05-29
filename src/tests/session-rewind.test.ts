import { describe, expect, it } from "vitest";
import { ClaudeAcpAgent } from "../acp-agent.js";
import { AgentSideConnection } from "@agentclientprotocol/sdk";

describe("session rewind", () => {
  it("advertises the experimental zed.rewindSession capability on initialize", async () => {
    const connectionMock = {
      sessionUpdate: async (_: unknown) => {},
    } as unknown as AgentSideConnection;

    const agent = new ClaudeAcpAgent(connectionMock);

    const response = await agent.initialize({
      protocolVersion: 1,
      clientCapabilities: {},
    });

    const meta = response.agentCapabilities?._meta as
      | { zed?: { rewindSession?: unknown } }
      | undefined;
    expect(meta?.zed?.rewindSession).toBe(true);
  });
});
