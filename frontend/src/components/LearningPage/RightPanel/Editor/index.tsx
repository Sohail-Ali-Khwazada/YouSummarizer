import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Toolbar } from "./Toolbar";

function TiptapEditor() {
  const [, setSelectionRefresh] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: {
          HTMLAttributes: {
            class: "bg-gray-100 text-gray-900 rounded-md p-4 font-mono",
          },
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4 dark:prose-invert",
      },
    },
    onTransaction: () => {
      setSelectionRefresh((prev) => prev + 1);
    },
  });

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <Card className="w-full h-[83.5vh] border-none shadow-none rounded-none p-0 overflow-hidden">
      <CardContent className="p-0 h-full flex flex-col">
        {/* Fixed toolbar */}
        <div className="px-4">
          <Toolbar editor={editor} />
        </div>

        {/* Scrollable editor */}
        <div className="flex-1 overflow-y-auto">
          <EditorContent editor={editor} />
        </div>
      </CardContent>
    </Card>
  );
}

export default TiptapEditor;
