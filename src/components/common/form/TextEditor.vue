<template>
  <div v-if="editor">
    <div v-if="!hideConfiguration" class="flex items-center gap-3">
      <div class="flex gap-0.5">
        <Button
          class="rounded-lg"
          size="icon-sm"
          variant="outline"
          @click.prevent="editor.chain().focus().toggleBold().run()"
          :class="{ 'bg-primary text-white': editor.isActive('bold') }"
        >
          <BoldIcon />
        </Button>
        <Button
          class="rounded-lg"
          size="icon-sm"
          variant="outline"
          @click.prevent="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'bg-primary text-white': editor.isActive('underline') }"
        >
          <UnderlineIcon />
        </Button>
        <Button
          class="rounded-lg"
          size="icon-sm"
          variant="outline"
          @click.prevent="editor.chain().focus().toggleItalic().run()"
          :class="{ 'bg-primary text-white': editor.isActive('italic') }"
        >
          <ItalicIcon />
        </Button>
        <Button
          class="rounded-lg"
          size="icon-sm"
          variant="outline"
          @click.prevent="setLink"
          :class="{ 'bg-primary text-white': editor.isActive('link') }"
        >
          <LinkIcon />
        </Button>
        <Button
          class="rounded-lg"
          size="icon-sm"
          variant="outline"
          @click.prevent="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'bg-primary text-white': editor.isActive('bulletList') }"
        >
          <ListIcon />
        </Button>
        <Button
          class="rounded-lg"
          size="icon-sm"
          variant="outline"
          @click.prevent="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'bg-primary text-white': editor.isActive('orderedList') }"
        >
          <LogsIcon />
        </Button>
      </div>
    </div>
    <EditorContent :editor="editor" class="mt-2 text-sm" />
    <Dialog v-model:open="showLinkDialog">
      <DialogContent class="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Enter URL</DialogTitle>
          <DialogDescription class="hidden">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem,
            nostrum.
          </DialogDescription>
        </DialogHeader>
        <div class="flex gap-3 py-6">
          <Input v-model="url" />
          <Button @click.prevent="addLink"> Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// icons
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Link as LinkIcon,
  List as ListIcon,
  Logs as LogsIcon,
  Heading1,
  Heading2,
  Heading3,
  Underline as UnderlineIcon,
} from "@lucide/vue";

export default {
  components: {
    EditorContent,
    BoldIcon,
    ItalicIcon,
    LinkIcon,
    ListIcon,
    LogsIcon,
    Heading1,
    Heading2,
    Heading3,
    UnderlineIcon,
    Button,
    Input,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  },
  emits: ["update:modelValue", "blur"],
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    hideConfiguration: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showLinkDialog: false,
      url: "",
      editor: null,
      selectedStyle: "regular",
      options: [{ label: "Regular", value: "regular" }],
    };
  },

  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value;
      if (isSame) {
        return;
      }
      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      editorProps: {
        attributes: {
          class:
            "prose max-h-40 h-40 border rounded-lg focus:ring-primary focus:ring focus:outline-none overflow-y-auto p-3",
        },
      },
      extensions: [
        Document,
        Paragraph,
        Text,
        Bold,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        Underline,
        Link.configure({
          openOnClick: false,
          defaultProtocol: "https",
        }),
        Heading.configure({
          levels: [1, 2, 3],
        }),
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit(
          "update:modelValue",
          this.editor.getHTML() === "<p></p>" ? "" : this.editor.getHTML(),
        );
      },
      onBlur: () => {
        this.$emit("blur");
      },
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
  methods: {
    setLink() {
      this.showLinkDialog = true;
      let previousUrl = this.editor.getAttributes("link").href;
      this.url = previousUrl;
    },
    addLink() {
      this.showLinkDialog = false;
      if (this.url === null) {
        return;
      }
      // empty
      if (this.url === "") {
        this.editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: this.url })
        .run();
    },
  },
};
</script>
