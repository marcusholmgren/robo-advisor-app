<script lang="ts">
  import { getTradesForAsset } from '$lib/api';
  import type { Trade } from '$lib/types';

  let trades = $state<Trade[]>([]);

  $effect(() => {
    // In a real app, you'd get the asset ID from the URL or a store
    getTradesForAsset(1).then((data) => {
      trades = data;
    });
  });
</script>

<div class="max-w-7xl mx-auto">
  <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
    <div class="flex min-w-72 flex-col gap-1">
      <p class="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">Trade History</p>
      <p class="text-gray-500 dark:text-[#92a4c9] text-base font-normal leading-normal">View and manage all trades for this asset.</p>
    </div>
    <a class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-wide hover:bg-primary/90 transition-colors" href="#add-trade-modal">
      <span class="material-symbols-outlined mr-2" style="font-size: 20px;">add</span>
      <span class="truncate">Add New Trade</span>
    </a>
  </div>
  <div class="w-full bg-white dark:bg-[#111722] rounded-xl border border-gray-200 dark:border-[#324467] overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="bg-gray-50 dark:bg-gray-900/50 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <tr>
            <th class="px-6 py-3 font-semibold" scope="col">Date</th>
            <th class="px-6 py-3 font-semibold" scope="col">Type</th>
            <th class="px-6 py-3 font-semibold text-right" scope="col">Quantity</th>
            <th class="px-6 py-3 font-semibold text-right" scope="col">Price</th>
            <th class="px-6 py-3 font-semibold text-right" scope="col">Total Value</th>
          </tr>
        </thead>
        <tbody>
          {#each trades as trade (trade.id)}
            <tr class="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{new Date(trade.trade_date).toLocaleDateString()}</td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold {trade.trade_type === 'BUY'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}"
                >
                  {trade.trade_type}
                </span>
              </td>
              <td class="px-6 py-4 text-right">{trade.quantity}</td>
              <td class="px-6 py-4 text-right">${trade.price.toFixed(2)}</td>
              <td class="px-6 py-4 text-right">${(trade.quantity * trade.price).toFixed(2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
