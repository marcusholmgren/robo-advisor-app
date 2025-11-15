<script lang="ts">
  import { getAssetsForPortfolio } from '$lib/api';
  import type { Asset } from '$lib/types';

  let assets = $state<Asset[]>([]);

  $effect(() => {
    // In a real app, you'd likely get the portfolio ID from the URL or a store
    getAssetsForPortfolio(1).then((data) => {
      assets = data;
    });
  });
</script>

<div class="layout-content-container flex flex-col w-full max-w-5xl flex-1 gap-6">
  <div class="flex flex-wrap items-center justify-between gap-4">
    <h1 class="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Manage Assets</h1>
    <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-primary/90 transition-colors">
      <span class="material-symbols-outlined text-base">add</span>
      <span class="truncate">Add New Asset</span>
    </button>
  </div>
  <div class="flex flex-col md:flex-row gap-4 items-center">
    <label class="flex flex-col min-w-40 h-12 w-full">
      <div class="flex w-full flex-1 items-stretch rounded-lg h-full">
        <div class="text-slate-400 dark:text-slate-500 flex border border-r-0 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 items-center justify-center pl-4 rounded-l-lg">
          <span class="material-symbols-outlined">search</span>
        </div>
        <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 h-full placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Search by asset name or symbol..." value=""/>
      </div>
    </label>
  </div>
  <div class="py-3 @container">
    <div class="flex overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
      <table class="flex-1">
        <thead>
          <tr class="bg-slate-50 dark:bg-slate-900">
            <th class="px-6 py-4 text-left text-slate-500 dark:text-slate-400 w-[40%] text-xs font-medium uppercase tracking-wider">Asset Name</th>
            <th class="px-6 py-4 text-left text-slate-500 dark:text-slate-400 w-[20%] text-xs font-medium uppercase tracking-wider">Symbol</th>
            <th class="px-6 py-4 text-right text-slate-500 dark:text-slate-400 w-[20%] text-xs font-medium uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
          {#each assets as asset (asset.id)}
            <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
              <td class="h-[72px] px-6 py-2 w-[40%] text-slate-900 dark:text-white text-sm font-medium leading-normal">{asset.name}</td>
              <td class="h-[72px] px-6 py-2 w-[20%] text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">{asset.symbol}</td>
              <td class="h-[72px] px-6 py-2 w-[20%] text-sm font-bold leading-normal tracking-[0.015em]">
                <div class="flex justify-end gap-2">
                  <button class="flex items-center justify-center rounded-lg h-9 w-9 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                    <span class="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button class="flex items-center justify-center rounded-lg h-9 w-9 text-slate-500 dark:text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors">
                    <span class="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
