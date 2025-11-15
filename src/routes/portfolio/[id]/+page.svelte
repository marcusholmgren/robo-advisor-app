<script lang="ts">
  import { page } from '$app/stores';
  import { getPortfolio, getAssetsForPortfolio } from '$lib/api';
  import type { Portfolio, Asset } from '$lib/types';

  let portfolio = $state<Portfolio | undefined>(undefined);
  let assets = $state<Asset[]>([]);

  $effect(() => {
    if ($page.params.id) {
      const portfolioId = parseInt($page.params.id, 10);
      getPortfolio(portfolioId).then((data) => {
        portfolio = data;
      });
      getAssetsForPortfolio(portfolioId).then((data) => {
        assets = data;
      });
    }
  });
</script>

{#if portfolio}
  <div class="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">
    <!-- Left Column -->
    <div class="lg:col-span-4 xl:col-span-3">
      <div class="sticky top-24 flex flex-col gap-6">
        <!-- PageHeading -->
        <div class="flex flex-col gap-3 rounded-xl bg-white dark:bg-white/5 p-6 border border-gray-200/80 dark:border-white/10">
          <p class="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.03em]">{portfolio.name}</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm sm:text-base font-normal leading-normal">{portfolio.description}</p>
        </div>
        <!-- ButtonGroup -->
        <div class="flex flex-col gap-3">
          <button class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
            <span class="material-symbols-outlined mr-2">add_circle</span>
            <span class="truncate">Add New Asset</span>
          </button>
        </div>
      </div>
    </div>
    <!-- Right Column / Asset Table -->
    <div class="lg:col-span-8 xl:col-span-9">
      <div class="bg-white dark:bg-white/5 rounded-xl border border-gray-200/80 dark:border-white/10 overflow-hidden">
        <div class="p-4 sm:p-6 border-b border-gray-200/80 dark:border-white/10">
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">search</span>
            <input class="w-full h-11 pl-10 pr-4 rounded-lg bg-gray-100 dark:bg-white/5 border-transparent focus:ring-2 focus:ring-primary focus:border-transparent transition" placeholder="Search for an asset..." type="text"/>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-white/5">
              <tr>
                <th class="px-6 py-3 font-medium" scope="col">Asset Name</th>
                <th class="px-6 py-3 font-medium" scope="col">Ticker</th>
                <th class="px-6 py-3 font-medium text-right" scope="col">Quantity</th>
                <th class="px-6 py-3 font-medium text-right" scope="col">Average Cost</th>
                <th class="px-6 py-3 font-medium text-center" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each assets as asset (asset.id)}
                <tr class="border-b border-gray-200/80 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <th class="px-6 py-4 font-bold text-gray-900 dark:text-white whitespace-nowrap" scope="row">{asset.name}</th>
                  <td class="px-6 py-4">{asset.symbol}</td>
                  <td class="px-6 py-4 text-right">{asset.current_quantity}</td>
                  <td class="px-6 py-4 text-right font-semibold">${asset.average_cost_basis?.toFixed(2)}</td>
                  <td class="px-6 py-4 text-center">
                    <div class="flex justify-center gap-2">
                      <button class="p-2 text-gray-500 hover:text-primary dark:hover:text-primary rounded-full hover:bg-primary/10 transition-colors"><span class="material-symbols-outlined text-base">edit</span></button>
                      <button class="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-500/10 transition-colors"><span class="material-symbols-outlined text-base">delete</span></button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
{/if}
