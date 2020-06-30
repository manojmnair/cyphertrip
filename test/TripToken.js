const TripTokenContract = artifacts.require("./TripToken.sol");

contract("TripToken", (accounts) => {
  let TripToken;
  const name = "TripToken";
  const symbol = "TRIP";
  const owner = accounts[0];
  //const beneficiary = accounts[1];

  beforeEach(async () => {
    tripToken = await TripTokenContract
      .new
      //name,
      //symbol
      //beneficiary,
      //owner
      ();
  });

  describe("initialization", () => {
    it("gets the token name", async () => {
      const tokenname = await tripToken.name();
      assert.equal(tokenname, name, "names should match");
    });

    it("gets the token symbol", async () => {
      const tokensymbol = await tripToken.symbol();
      assert.equal(tokensymbol, symbol, "symbols should match");
    });

    it("gets the owner", async () => {
      const tokenowner = await tripToken.owner();
      assert.equal(tokenowner, owner, "owner should match");
    });
  });

  describe("totalSupply", () => {
    it("...should have a total supply of 21000000.", async () => {
      //const tripTokenInstance = await TripToken.deployed();

      // Get total supply
      const totalsupply = await tripToken.totalSupply.call();

      assert.equal(
        totalsupply,
        21000000,
        "The contract should have a total supply of 21000000 tokens."
      );
    });
  });

  describe("when transfer is sent by another account", () => {
    it("does not able to send tokens unless owner", async () => {
      //const tripTokenInstance = await TripToken.deployed()
      //const expected = await greeter.greet();
      try {
        await tripToken.transfer(accounts[2], 200, { from: accounts[1] });
      } catch (err) {
        const errorMessage = "Ownable: caller is not the owner";
        assert.equal(
          err.reason,
          errorMessage,
          "should not be able to transfer  unless owner"
        );
        return;
      }
      assert(false, "should not be able to transfer");
    });
  });
});
