<template>
  <div class="px-4 py-5">
		<div class="flex flex-col gap-3">
			<ItemsListButton title="BNI" subtitle="Bank Nasional Indonesia" type="default">
				<template #actions>
					<Icon name="heroicons:ellipsis-vertical-20-solid" class="text-xl text-title" />
				</template>
			</ItemsListButton>
			<ItemsListButton title="BNI" subtitle="Bank Nasional Indonesia" type="default">
				<template #actions>
					<Icon name="heroicons:ellipsis-vertical-20-solid" class="text-xl text-title" />
				</template>
			</ItemsListButton>
			<ItemsListButton title="BNI" subtitle="Bank Nasional Indonesia" type="default">
				<template #actions>
					<Icon name="heroicons:ellipsis-vertical-20-solid" class="text-xl text-title" />
				</template>
			</ItemsListButton>
			<ItemsListButton title="BNI" subtitle="Bank Nasional Indonesia" type="default">
				<template #actions>
					<Icon name="heroicons:ellipsis-vertical-20-solid" class="text-xl text-title" />
				</template>
			</ItemsListButton>
		</div>
		<Button type="button" variant="outline" class="w-full border-primary mt-5">
			<Icon name="heroicons:plus-small-solid" class="text-xl mr-2" />
			<p class="text-base md:text-lg">Tambah Rekening</p>
		</Button>
  </div>
</template>

<script setup lang="ts">
const title = "Rekening Bank";
definePageMeta({
  layout: "detail",
  middleware: "auth",
});

useSeoMeta({
  title: title,
});

const layoutData = useState("layoutData");
layoutData.value = {
  title: title,
};
</script>
