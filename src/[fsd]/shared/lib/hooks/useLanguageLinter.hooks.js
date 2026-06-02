import { useCallback, useEffect, useState } from 'react';

import { CodeMirrorLinterHelpers } from '@/[fsd]/shared/lib/helpers';
import { setDiagnostics } from '@codemirror/lint';

export const useLanguageLinter = (defaultLanguage, editorView, isGenerating = false) => {
  const initLang = defaultLanguage || localStorage.getItem('EditorContentType') || 'text';

  const [language, setLanguage] = useState(initLang);
  const [extensions, setExtensions] = useState([]);

  useEffect(() => {
    CodeMirrorLinterHelpers.getExtensionsByLang(initLang).then(({ extensionWithLinter }) => {
      setExtensions(extensionWithLinter);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    CodeMirrorLinterHelpers.getExtensionsByLang(language).then(
      ({ extensionWithoutLinter, extensionWithLinter }) => {
        setExtensions(isGenerating ? extensionWithoutLinter : extensionWithLinter);
      },
    );
  }, [isGenerating, language]);

  const onChangeLanguage = useCallback(
    async newLanguage => {
      localStorage.setItem('EditorContentType', newLanguage);

      if (editorView) editorView.dispatch(setDiagnostics(editorView.state, []));

      const { extensionWithoutLinter, extensionWithLinter } =
        await CodeMirrorLinterHelpers.getExtensionsByLang(newLanguage);

      setExtensions(extensionWithoutLinter);

      setTimeout(() => {
        setExtensions(extensionWithLinter);
      }, 0);

      setLanguage(newLanguage);
    },
    [editorView],
  );

  return {
    extensions,
    onChangeLanguage,
    language,
  };
};
