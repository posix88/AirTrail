<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import * as Select from '$lib/components/ui/select';
  import type { SuperForm } from 'sveltekit-superforms';
  import { z } from 'zod';
  import { Input, Textarea } from '$lib/components/ui/input';
  import { toTitleCase } from '$lib/utils';
  import type { flightSchema } from '$lib/zod/flight';
  import { AircraftField, AirlineField } from '$lib/components/form-fields';
  import { Separator } from '$lib/components/ui/separator';

  let {
    form,
  }: {
    form: SuperForm<z.infer<typeof flightSchema>>;
  } = $props();
  const { form: formData } = form;
</script>

<section>
  <h3 class="font-medium">Flight Information</h3>
  <Separator class="mt-2 mb-3" />
  <div class="grid gap-4">
    <AircraftField {form} />
    <AirlineField {form} />
    <div class="grid grid-cols-[1fr_1fr_1fr] gap-2">
      <Form.Field {form} name="flightReason">
        <Form.Control let:attrs>
          <Form.Label>Flight Reason</Form.Label>
          <Select.Root
            selected={{
              label: $formData.flightReason
                ? toTitleCase($formData.flightReason)
                : undefined,
              value: $formData.flightReason,
            }}
            onSelectedChange={(value) => {
              if (value) {
                if (value.value === $formData.flightReason) {
                  $formData.flightReason = null;
                } else {
                  $formData.flightReason = value.value;
                }
              }
            }}
          >
            <Select.Trigger {...attrs}>
              <Select.Value placeholder="Select reason..." />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="leisure" label="Leisure" />
              <Select.Item value="business" label="Business" />
              <Select.Item value="crew" label="Crew" />
              <Select.Item value="other" label="Other" />
            </Select.Content>
          </Select.Root>
          <input
            type="hidden"
            value={$formData.flightReason}
            name={attrs.name}
          />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="flightNumber">
        <Form.Control let:attrs>
          <Form.Label>Flight Number</Form.Label>
          <Input bind:value={$formData.flightNumber} {...attrs} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="aircraftReg">
        <Form.Control let:attrs>
          <Form.Label>Aircraft Registration</Form.Label>
          <Input bind:value={$formData.aircraftReg} {...attrs} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    </div>
    <Form.Field {form} name="note">
      <Form.Control let:attrs>
        <Form.Label>Notes</Form.Label>
        <Textarea
          bind:value={$formData.note}
          class="resize-y h-20 min-h-10 max-h-32"
          {...attrs}
        />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
  </div>
</section>
