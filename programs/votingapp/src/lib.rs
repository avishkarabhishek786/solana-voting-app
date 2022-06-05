use anchor_lang::prelude::*;
declare_id!("HULc9TCrcv5XUunafCBt1VEsdAMXvMHao7YoujHQLvY1");

#[program]
pub mod votingapp {
    use super::*;
    
    pub fn initialize(ctx: Context<Initialize>) -> Result <()> {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.johnny = 0;
        vote_account.amber = 0;
        Ok(())
    }
    
    pub fn vote_johnny(ctx: Context<Vote>) -> Result <()> {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.johnny += 1;
        Ok(())
    }
    pub fn vote_amber(ctx: Context<Vote>) -> Result <()> {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.amber += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub vote_account: Account<'info, VoteAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}
#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub vote_account: Account<'info, VoteAccount>,
}

#[account]
pub struct VoteAccount {
    pub johnny: u64,
    pub amber: u64,
}