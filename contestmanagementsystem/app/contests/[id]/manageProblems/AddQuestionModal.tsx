export default function AddQuestionModal({ questionType, onClose, contestId }) {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add New Question</p>
          <button className="delete" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          {questionType === 'form' && <FormEditor contestId={contestId} />}
          {questionType === 'mcq' && <QAEditor contestId={contestId} />}
          {questionType === 'file' && <FileConfigEditor contestId={contestId} />}
        </section>
      </div>
    </div>
  );
}
