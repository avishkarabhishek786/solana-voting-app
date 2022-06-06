use anchor_lang::prelude::*;
declare_id!("8gv2WGHr41F6bBRakKWcCPM41irZMBvSwR93aC6mLQuK");

#[program]
pub mod votingapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result <()> {
        ctx.accounts.vote_account.bump = *ctx.bumps.get("bump").unwrap();
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
#[instruction(vote_account_bump: u8)]
pub struct Initialize<'info> {
    #[account(init, seeds = [b"vote_account".as_ref()], bump, payer = user, space = 16 + 16)]
    vote_account: Account<'info, VotingState>,
    #[account(mut)]
    user: Signer<'info>,
    system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut, seeds = [b"vote_account".as_ref()], bump = vote_account.bump)]
    vote_account: Account<'info, VotingState>,
}

#[account]
#[derive(Default)]
pub struct VotingState {
    johnny: u64,
    amber: u64,
    bump: u8,
}