<script lang="ts">
  import { getPortfolios } from '$lib/api';
  import type { Portfolio } from '$lib/types';
  import {currencyFormatter, dateFormatter, percentageFormatter} from "$lib/formatters.ts";

  let portfolios = $state<Portfolio[]>([]);

  $effect(() => {
    getPortfolios().then((data) => {
      portfolios = data;
    });
  });
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-wrap items-center justify-between gap-4">
    <p class="text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white">Portfolio Dashboard</p>
  </div>
  <div class="px-0 py-3">
    <label class="flex h-12 w-full flex-col">
      <div class="flex h-full w-full flex-1 items-stretch rounded-lg">
        <div class="flex items-center justify-center rounded-l-lg border-y border-l border-gray-300 bg-gray-100 pl-4 dark:border-white/20 dark:bg-white/5">
          <span class="material-symbols-outlined text-gray-500 dark:text-gray-400">search</span>
        </div>
        <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border border-gray-300 bg-gray-100 px-4 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 dark:border-white/20 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary" placeholder="Search by portfolio name or risk level..." value=""/>
      </div>
    </label>
  </div>
  <!-- Portfolio Table -->
  <div class="w-full overflow-x-auto @container">
    <div class="overflow-hidden rounded-lg border border-gray-300 dark:border-white/20">
      <table class="w-full flex-1">
        <thead>
          <tr class="bg-gray-100 dark:bg-white/5">
            <th class="whitespace-nowrap px-4 py-3 text-left text-sm font-medium leading-normal text-gray-600 dark:text-gray-300">Portfolio Name</th>
            <th class="whitespace-nowrap px-4 py-3 text-left text-sm font-medium leading-normal text-gray-600 dark:text-gray-300">Total Value</th>
            <th class="whitespace-nowrap px-4 py-3 text-left text-sm font-medium leading-normal text-gray-600 dark:text-gray-300">Gain/Loss</th>
            <th class="whitespace-nowrap px-4 py-3 text-left text-sm font-medium leading-normal text-gray-600 dark:text-gray-300">Risk Level</th>
            <th class="whitespace-nowrap px-4 py-3 text-left text-sm font-medium leading-normal text-gray-600 dark:text-gray-300">Last Updated</th>
            <th class="whitespace-nowrap px-4 py-3 text-left text-sm font-medium leading-normal text-gray-600 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#if portfolios.length > 0}
            {#each portfolios as portfolio (portfolio.id)}
              <tr class="border-t border-t-gray-200 dark:border-t-white/20 bg-white dark:bg-gray-800">
                <td class="h-[72px] px-4 py-2 text-sm font-normal leading-normal text-gray-900 dark:text-white">{portfolio.name}</td>
                <td class="h-[72px] px-4 py-2 text-sm font-normal leading-normal text-gray-500 dark:text-gray-400">{currencyFormatter(portfolio.total_portfolio_value ?? 0)}</td>
                <td class="h-[72px] px-4 py-2 text-sm font-normal leading-normal {portfolio.total_unrealized_pnl && portfolio.total_unrealized_pnl > 0 ? 'text-teal-600 dark:text-teal-400' : 'text-red-600 dark:text-red-400'}">
                  {currencyFormatter(portfolio.total_unrealized_pnl ?? 0) ?? 'N/A'}
                  ({percentageFormatter(portfolio.total_unrealized_pnl_pct ?? 0) ?? 'N/A'})
                </td>
                <td class="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                  <span class="inline-flex items-center justify-center rounded-md bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">{portfolio.risk_level ?? 'N/A'}</span>
                </td>                <td class="h-[72px] px-4 py-2 text-sm font-normal leading-normal text-gray-500 dark:text-gray-400">{dateFormatter(new Date(portfolio.updated_at))}</td>
                <td class="h-[72px] px-4 py-2 text-sm font-bold leading-normal tracking-[0.015em]">
                  <div class="flex items-center gap-2">
                    <a class="text-primary hover:underline" href="/portfolio/{portfolio.id}">View Details</a>
                  </div>
                </td>
              </tr>
            {/each}
          {:else}
            <!-- Empty State Example -->
            <tr>
              <td colspan="6">
                <div class="flex flex-col p-0">
                  <div class="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-gray-300 dark:border-white/20 px-6 py-14">
                    <div class="flex max-w-[480px] flex-col items-center gap-2">
                      <p class="text-center text-lg font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-white">You haven't created any portfolios yet</p>
                      <p class="text-center text-sm font-normal leading-normal text-gray-500 dark:text-gray-400">Get started by creating your first portfolio to track your investments.</p>
                    </div>
                    <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white">
                      <span class="truncate">Create Your First Portfolio</span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
