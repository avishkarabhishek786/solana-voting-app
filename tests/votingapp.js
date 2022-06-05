const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("johnny-vs-amber", () => {
  /* Configure the client */
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Votingapp;
  const voteAccount = anchor.web3.Keypair.generate();

  it("Initializes with 0 votes", async () => {
    console.log("Testing Initialize...");
    
    await program.rpc.initialize({
      accounts: {
        voteAccount: voteAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [voteAccount],
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );
    console.log("Johnny: ", account.johnny.toString());
    console.log("Amber: ", account.amber.toString());
    assert.ok(
      account.johnny.toString() == 0 && account.amber.toString() == 0
    );
  });
  it("Votes correctly for johnny", async () => {
    console.log("Testing voteJohnny...");
    await program.rpc.voteJohnny({
      accounts: {
        voteAccount: voteAccount.publicKey,
      },
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );
    console.log("Johnny: ", account.johnny.toString());
    console.log("Amber: ", account.amber.toString());
    assert.ok(
      account.johnny.toString() == 1 && account.amber.toString() == 0
    );
  });
  it("Votes correctly for amber", async () => {
    console.log("Testing voteAmber...");
    await program.rpc.voteAmber({
      accounts: {
        voteAccount: voteAccount.publicKey,
      },
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );
    console.log("Johnny: ", account.johnny.toString());
    console.log("Amber: ", account.amber.toString());
    assert.ok(
      account.johnny.toString() == 1 && account.amber.toString() == 1
    );
  });
});