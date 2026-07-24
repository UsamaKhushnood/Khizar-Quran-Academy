<template>
  <div class="min-h-screen bg-background">
    <!-- Hero -->
    <header class="border-b border-border">
      <div
        class="container mx-auto px-6 py-4 flex items-center justify-between"
      >
        <div class="flex items-center gap-2">
          <div
            class="size-7 rounded-md bg-primary flex items-center justify-center"
          >
            <Layers class="size-4 text-primary-foreground" />
          </div>
          <span class="font-medium tracking-tight">Shadcn Init</span>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="container mx-auto px-6 py-24 pb-30 text-center">
      <Badge variant="outline">
        <span class="size-1.5 rounded-full bg-primary inline-block"></span>
        Built on top of shadcn-vue
      </Badge>
      <h1
        class="text-5xl font-semibold tracking-tight text-foreground mb-6 leading-tight max-w-2xl mx-auto mt-6"
      >
        The Pre-Built Easy to use Components for your App
      </h1>
      <p
        class="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        A collection of accessible, composable form components built with
        Vuelidate integration. Every component hooks into
        <code class="text-primary font-mono text-sm">CForm</code> for seamless
        validation.
      </p>
      <div class="flex items-center justify-center gap-3 flex-wrap">
        <Button size="lg" as-child>
          <a href="#components">Browse Components</a>
        </Button>
        <Button variant="outline" size="lg" as-child>
          <a href="/dashboard">View Dashboard</a>
        </Button>
        <Button variant="outline" size="lg" as-child>
          <a href="/login">Login Demo</a>
        </Button>
      </div>
    </section>

    <!-- Stats Row -->
    <section class="border-y border-border bg-muted/30">
      <div
        class="container mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="text-2xl font-bold text-foreground">{{ stat.value }}</div>
          <div class="text-sm text-muted-foreground mt-1">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Components Grid -->
    <section id="components" class="container mx-auto px-6 py-20">
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-foreground mb-3">Components</h2>
        <p class="text-muted-foreground">
          All components integrate with
          <code class="text-primary font-mono text-sm">CForm</code> +
          <code class="text-primary font-mono text-sm">CField</code> for
          automatic validation messages.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <!-- CInput -->
        <ComponentCard
          name="CInput"
          path="components/common/form/CInput.vue"
          description="A thin wrapper around shadcn Input that wires blur events to Vuelidate field context automatically."
          :tags="['text', 'number', 'v-model']"
        >
          <template #preview>
            <CForm :initialValues="demo" :schema="{}" :onSubmit="() => {}">
              <div class="space-y-3">
                <CField name="text" :show-message="false">
                  <CInput v-model="demo.text" placeholder="Type something..." />
                </CField>
                <CField name="number" :show-message="false">
                  <CInput
                    v-model="demo.number"
                    type="number"
                    placeholder="Enter a number..."
                  />
                </CField>
              </div>
            </CForm>
          </template>
          <template #code>{{ snippets.cinput }}</template>
        </ComponentCard>

        <!-- PasswordInput -->
        <ComponentCard
          name="PasswordInput"
          path="components/common/form/PasswordInput.vue"
          description="Password input with an eye icon toggle. Inherits all native input attrs and auto-hooks Vuelidate blur."
          :tags="['password', 'toggle', 'secure']"
        >
          <template #preview>
            <CForm :initialValues="demo" :schema="{}" :onSubmit="() => {}">
              <CField name="password" :show-message="false">
                <PasswordInput
                  v-model="demo.password"
                  placeholder="Enter your password"
                />
              </CField>
            </CForm>
          </template>
          <template #code>{{ snippets.password }}</template>
        </ComponentCard>

        <!-- CSelect -->
        <ComponentCard
          name="CSelect"
          path="components/common/form/CSelect.vue"
          description="Styled select dropdown with optional loading state, disabled options, icon & image support per item."
          :tags="['select', 'dropdown', 'options']"
        >
          <template #preview>
            <CSelect
              v-model="demo.select"
              placeholder="Pick a framework"
              :options="frameworkOptions"
            />
          </template>
          <template #code>{{ snippets.cselect }}</template>
        </ComponentCard>

        <!-- CCombobox -->
        <ComponentCard
          name="CCombobox"
          path="components/common/form/CCombobox.vue"
          description="Searchable single-select combobox backed by Popover + Command. Supports custom label/value keys."
          :tags="['search', 'combobox', 'single']"
        >
          <template #preview>
            <CCombobox
              v-model="demo.combobox"
              :options="countryOptions"
              placeholder="Select a country..."
              searchPlaceholder="Search country..."
            />
          </template>
          <template #code>{{ snippets.ccombobox }}</template>
        </ComponentCard>

        <!-- CMultiselect -->
        <ComponentCard
          name="CMultiselect"
          path="components/common/form/CMultiselect.vue"
          description="Multi-value tag input with Combobox search. Selected items display as removable badges."
          :tags="['multi', 'tags', 'search']"
        >
          <template #preview>
            <CMultiselect
              v-model="demo.multiselect"
              :options="skillOptions"
              placeholder="Select skills..."
            />
          </template>
          <template #code>{{ snippets.cmultiselect }}</template>
        </ComponentCard>

        <!-- CCheckboxGroup -->
        <ComponentCard
          name="CCheckboxGroup"
          path="components/common/form/CCheckboxGroup.vue"
          description="Renders a list of checkboxes from an options array. Pass radio=true for single-select behavior."
          :tags="['checkbox', 'multi', 'radio']"
        >
          <template #preview>
            <div class="space-y-4">
              <div>
                <p class="text-xs text-muted-foreground mb-2">Multi-select</p>
                <CCheckboxGroup
                  v-model="demo.checkboxes"
                  :options="colorOptions"
                  class="flex-wrap"
                />
              </div>
            </div>
          </template>
          <template #code>{{ snippets.ccheckboxgroup }}</template>
        </ComponentCard>

        <!-- Textarea -->
        <ComponentCard
          name="Textarea"
          path="components/ui/textarea"
          description="Any native or shadcn element works with CField. Use the v-slot to grab handleBlur and validation is wired automatically."
          :tags="['textarea', 'v-slot', 'blur']"
        >
          <template #preview>
            <CForm
              :initialValues="demo"
              :schema="textareaSchema"
              :onSubmit="() => {}"
            >
              <div class="space-y-4">
                <CField
                  name="message"
                  label="Message"
                  v-slot="{ handleBlur }"
                  required
                >
                  <Textarea
                    v-model="demo.message"
                    @blur="handleBlur"
                    placeholder="Write something..."
                    class="min-h-[80px] resize-none"
                  />
                </CField>
                <Button type="submit" size="sm">Validate</Button>
              </div>
            </CForm>
          </template>
          <template #code>{{ snippets.textarea }}</template>
        </ComponentCard>

        <!-- CRadioGroup -->
        <ComponentCard
          name="CRadioGroup"
          path="components/common/form/CRadioGroup.vue"
          description="Native radio button group rendered from an options array. Label wraps the radio for full-click area."
          :tags="['radio', 'single', 'options']"
        >
          <template #preview>
            <CRadioGroup v-model="demo.radioGroup" :options="planOptions" />
          </template>
          <template #code>{{ snippets.cradiogroup }}</template>
        </ComponentCard>

        <!-- CDatePicker -->
        <ComponentCard
          name="CDatePicker"
          path="components/common/form/CDatePicker.vue"
          description="Full calendar date picker with month/year dropdowns. Emits ISO date string (YYYY-MM-DD)."
          :tags="['date', 'calendar', 'picker']"
        >
          <template #preview>
            <CDatePicker v-model="demo.date" placeholder="Select a date" />
          </template>
          <template #code>{{ snippets.cdatepicker }}</template>
        </ComponentCard>

        <!-- CField -->
        <ComponentCard
          name="CField"
          path="components/common/form/CField.vue"
          description="Wraps any input with a label, helper text, and Vuelidate error message. Resolves nested dot-paths."
          :tags="['wrapper', 'label', 'validation']"
        >
          <template #preview>
            <CForm
              :initialValues="fieldDemoForm"
              :schema="fieldDemoSchema"
              :onSubmit="() => {}"
            >
              <div class="space-y-4">
                <CField
                  name="email"
                  label="Email Address"
                  required
                  helper="We'll never share your email"
                >
                  <CInput
                    v-model="fieldDemoForm.email"
                    placeholder="you@example.com"
                  />
                </CField>
                <Button type="submit" size="sm">Validate</Button>
              </div>
            </CForm>
          </template>
          <template #code>{{ snippets.cfield }}</template>
        </ComponentCard>

        <!-- CForm -->
        <ComponentCard
          name="CForm"
          path="components/common/form/CForm.vue"
          description="The orchestrator. Provides Vuelidate context via provide/inject, handles submit + scroll-to-error."
          :tags="['form', 'vuelidate', 'context']"
        >
          <template #preview>
            <div
              class="bg-muted/40 rounded-lg p-4 text-sm text-muted-foreground space-y-2"
            >
              <p class="font-medium text-foreground">Props</p>
              <ul class="space-y-1 text-xs font-mono">
                <li>
                  <span class="text-primary">initialValues</span> — reactive
                  form object
                </li>
                <li>
                  <span class="text-primary">schema</span> — Vuelidate rules
                  object
                </li>
                <li>
                  <span class="text-primary">onSubmit</span> — called on valid
                  submit
                </li>
              </ul>
            </div>
          </template>
          <template #code>{{ snippets.cform }}</template>
        </ComponentCard>

        <!-- TextEditor -->
        <ComponentCard
          name="TextEditor"
          path="components/common/form/TextEditor.vue"
          description="Rich text editor powered by Tiptap with bold, italic, underline, lists, links, and headings toolbar."
          :tags="['rich-text', 'tiptap', 'WYSIWYG']"
        >
          <template #preview>
            <div class="bg-muted/40 rounded-lg p-4 text-sm space-y-2">
              <p class="text-xs font-medium text-foreground">Toolbar actions</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="action in editorActions"
                  :key="action"
                  class="inline-flex items-center gap-1 bg-background border border-border rounded px-2 py-0.5 text-xs text-foreground"
                >
                  {{ action }}
                </span>
              </div>
              <p class="text-xs text-muted-foreground mt-2">
                Requires <code class="text-primary">@tiptap/*</code> packages.
                Use <code class="text-primary">v-model</code> to bind HTML
                string.
              </p>
            </div>
          </template>
          <template #code>{{ snippets.texteditor }}</template>
        </ComponentCard>
      </div>
    </section>

    <!-- Usage with CForm -->
    <section class="border-t border-border bg-muted/20">
      <div class="container mx-auto px-6 py-20">
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 class="text-3xl font-bold text-foreground mb-4">
              Built for validation
            </h2>
            <p class="text-muted-foreground mb-6 leading-relaxed">
              Every component plugs directly into
              <code class="text-primary font-mono">CForm</code>. Wrap fields
              with <code class="text-primary font-mono">CField</code> and
              validation messages, scroll-to-error, and label states are handled
              automatically via Vuelidate.
            </p>
            <div class="space-y-3">
              <div
                v-for="feature in features"
                :key="feature.title"
                class="flex gap-3"
              >
                <div
                  class="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"
                >
                  <Check class="size-3 text-primary" />
                </div>
                <div>
                  <p class="text-sm font-medium text-foreground">
                    {{ feature.title }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {{ feature.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="rounded-xl border border-border bg-card overflow-hidden">
            <div
              class="border-b border-border px-4 py-3 flex items-center gap-2"
            >
              <div class="size-2.5 rounded-full bg-red-400"></div>
              <div class="size-2.5 rounded-full bg-yellow-400"></div>
              <div class="size-2.5 rounded-full bg-green-400"></div>
              <span class="ml-2 text-xs text-muted-foreground font-mono"
                >ExampleForm.vue</span
              >
            </div>
            <pre
              class="p-4 text-xs font-mono text-foreground overflow-auto leading-relaxed"
              >{{ fullFormSnippet }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-border">
      <div
        class="container mx-auto px-6 py-8 flex items-center justify-between text-sm text-muted-foreground"
      >
        <span>FormKit — Built with shadcn-vue + Vuelidate</span>
        <div class="flex items-center gap-1">
          <span class="size-2 rounded-full bg-primary inline-block"></span>
          <span>{{ componentCount }} components</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Check, Layers } from "@lucide/vue";
import { required, email, helpers } from "@vuelidate/validators";

// Form components
import CInput from "@/components/common/form/CInput.vue";
import PasswordInput from "@/components/common/form/PasswordInput.vue";
import CSelect from "@/components/common/form/CSelect.vue";
import CCombobox from "@/components/common/form/CCombobox.vue";
import CMultiselect from "@/components/common/form/CMultiselect.vue";
import CCheckboxGroup from "@/components/common/form/CCheckboxGroup.vue";
import CRadioGroup from "@/components/common/form/CRadioGroup.vue";
import CDatePicker from "@/components/common/form/CDatePicker.vue";
import CField from "@/components/common/form/CField.vue";
import CForm from "@/components/common/form/CForm.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

// ─── Inline ComponentCard ─────────────────────────────────────────────────────
import { defineComponent, h } from "vue";
const ComponentCard = defineComponent({
  props: {
    name: String,
    path: String,
    description: String,
    tags: Array,
  },
  setup(props, { slots }) {
    const showCode = ref(false);
    return () =>
      h(
        "div",
        {
          class:
            "rounded border border-border bg-card overflow-hidden flex flex-col",
        },
        [
          // Header
          h(
            "div",
            {
              class:
                "border-b border-border px-5 py-4 flex items-start justify-between gap-3",
            },
            [
              h("div", {}, [
                h(
                  "h3",
                  { class: "font-semibold text-sm text-foreground" },
                  props.name,
                ),
                h(
                  "p",
                  {
                    class: "text-xs text-muted-foreground mt-1 leading-relaxed",
                  },
                  props.description,
                ),
              ]),
              h(
                "div",
                { class: "flex flex-wrap gap-1 justify-end shrink-0" },
                (props.tags || []).map((tag) =>
                  h(
                    "span",
                    {
                      class:
                        "text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono",
                    },
                    tag,
                  ),
                ),
              ),
            ],
          ),
          // Preview area
          h("div", { class: "p-5 flex-1 bg-muted/10" }, [
            slots.preview ? slots.preview() : null,
          ]),
          // Footer
          h("div", { class: "border-t border-border" }, [
            h(
              "button",
              {
                class:
                  "w-full px-5 py-3 flex items-center justify-between text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors",
                onClick: () => {
                  showCode.value = !showCode.value;
                },
              },
              [
                h("span", { class: "font-mono" }, props.path),
                h("span", {}, showCode.value ? "Hide code ↑" : "Show code ↓"),
              ],
            ),
            showCode.value
              ? h(
                  "div",
                  { class: "border-t border-border bg-muted/20 px-5 py-4" },
                  [
                    h(
                      "pre",
                      {
                        class:
                          "text-xs font-mono text-foreground overflow-auto whitespace-pre-wrap",
                      },
                      slots.code ? slots.code() : "",
                    ),
                  ],
                )
              : null,
          ]),
        ],
      );
  },
});

// ─── Demo state ───────────────────────────────────────────────────────────────
const demo = reactive({
  text: "",
  number: "",
  password: "",
  select: "",
  combobox: "",
  multiselect: [],
  checkboxes: [],
  radio: "",
  radioGroup: "",
  date: "",
  message: "",
});

// CField demo
const fieldDemoForm = reactive({ email: "" });
const fieldDemoSchema = {
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Must be a valid email", email),
  },
};

// Textarea demo
const textareaSchema = {
  message: {
    required: helpers.withMessage("Message is required", required),
  },
};

// ─── Options ──────────────────────────────────────────────────────────────────
const frameworkOptions = [
  { label: "Vue 3", value: "vue" },
  { label: "React", value: "react" },
  { label: "Nuxt", value: "nuxt" },
  { label: "SvelteKit", value: "svelte" },
];

const countryOptions = [
  { label: "Australia", value: "AU" },
  { label: "Canada", value: "CA" },
  { label: "Germany", value: "DE" },
  { label: "Japan", value: "JP" },
  { label: "United Kingdom", value: "GB" },
  { label: "United States", value: "US" },
];

const skillOptions = [
  "Vue 3",
  "TypeScript",
  "Tailwind",
  "Pinia",
  "Vuelidate",
  "shadcn-vue",
];

const colorOptions = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
];

const sizeOptions = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
];

const planOptions = [
  { label: "Free", value: "free" },
  { label: "Pro", value: "pro" },
  { label: "Enterprise", value: "enterprise" },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────
const componentCount = 12;

const stats = [
  { value: "12", label: "Components" },
  { value: "100%", label: "Vuelidate integrated" },
  { value: "shadcn-vue", label: "Powered by" },
  { value: "v-model", label: "Standard binding" },
];

const features = [
  {
    title: "Automatic blur handling",
    desc: "Each input calls handleBlur via field context on blur, triggering Vuelidate touch.",
  },
  {
    title: "Nested dot-path support",
    desc: "CField resolves paths like answers.0.text for dynamic form arrays.",
  },
  {
    title: "Scroll to first error",
    desc: "CForm scrolls to the first invalid field automatically on submit.",
  },
  {
    title: "Lazy validation",
    desc: "Schema is re-evaluated reactively; errors only show after the field is touched.",
  },
];

const editorActions = [
  "Bold",
  "Italic",
  "Underline",
  "Link",
  "Bullet List",
  "Ordered List",
];

// ─── Code snippets ────────────────────────────────────────────────────────────
const snippets = {
  cinput: `<CInput v-model="form.name" placeholder="Enter name" />
<CInput v-model="form.age" type="number" />`,

  password: `<PasswordInput v-model="form.password"
  placeholder="Enter password" />`,

  cselect: `<CSelect
  v-model="form.role"
  placeholder="Select role"
  :options="[
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ]"
/>`,

  ccombobox: `<CCombobox
  v-model="form.country"
  :options="countries"
  placeholder="Select country..."
  searchPlaceholder="Search..."
/>`,

  cmultiselect: `<CMultiselect
  v-model="form.tags"
  :options="['Vue', 'React', 'Angular']"
  placeholder="Select tags..."
/>`,

  ccheckboxgroup: `<!-- Multi-select -->
<CCheckboxGroup
  v-model="form.colors"
  :options="colorOptions"
/>

<!-- Radio mode -->
<CCheckboxGroup
  v-model="form.size"
  :options="sizeOptions"
  :radio="true"
  :bordered="true"
/>`,

  textarea: `<CField name="message" label="Message" v-slot={handleBlur} required>
    <Textarea
      v-model="form.message"
      @blur="handleBlur"
      placeholder="Write something..."
    />
</CField>

<!-- That's it — blur is wired to Vuelidate automatically.
     Works with ANY element, not just CInput. -->`,

  ccheckboxdropdown: `<CCheckboxesDropdown
  v-model="form.roles"
  :options="roleOptions"
  placeholder="Select roles..."
/>`,

  cradiogroup: `<CRadioGroup
  v-model="form.plan"
  :options="[
    { label: 'Free', value: 'free' },
    { label: 'Pro', value: 'pro' },
  ]"
/>`,

  cdatepicker: `<CDatePicker
  v-model="form.date"
  placeholder="Pick a date"
/>
<!-- Emits: "2024-05-15" (YYYY-MM-DD) -->`,

  cfield: `<CField name="email" label="Email" required
  helper="We'll never share your email">
  <CInput v-model="form.email" />
</CField>`,

  cform: `<CForm
  :initialValues="form"
  :schema="schema"
  :onSubmit="handleSubmit"
>
  <!-- CField + inputs here -->
</CForm>`,

  texteditor: `<TextEditor v-model="form.body" />

<!-- Hide toolbar -->
<TextEditor
  v-model="form.body"
  :hideConfiguration="true"
/>`,
};

const fullFormSnippet = `<CForm :initialValues="form" :schema="schema" :onSubmit="submit">
  <div class="space-y-4">
    <CField name="email" label="Email" required>
      <CInput v-model="form.email" />
    </CField>

    <CField name="password" label="Password" required>
      <PasswordInput v-model="form.password" />
    </CField>

    <CField name="role" label="Role">
      <CSelect v-model="form.role" :options="roles" />
    </CField>

    <Button type="submit">Submit</Button>
  </div>
</CForm>`;
</script>
