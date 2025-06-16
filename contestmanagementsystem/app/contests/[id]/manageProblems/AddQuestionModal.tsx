import FileConfigEditor from "./file/FileConfigEditor";
import FormBuilder from "./form/FormBuilder";
import McqEditor from "./mcq/McqEditor";

export default function AddQuestionModal({
  contestId,
  questionType,
  onClose,
}: {
  contestId: string;
  questionType: 'mcq' | 'file' | 'form';
  onClose: () => void;
}) {
  if (questionType === 'mcq') {
    return <McqEditor contestId={contestId} onClose={onClose} />;
  }

  // if (questionType === 'file') {
  //   return <FileConfigEditor contestId={contestId} onClose={onClose} />;
  // }

  // if (questionType === 'form') {
  //   return <FormBuilder contestId={contestId} onClose={onClose} />;
  // }

  return null;
}
