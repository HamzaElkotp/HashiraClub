'use client';
import { useState } from 'react';
import { FieldConfig } from './types';
import { v4 as uuidv4 } from 'uuid';
import FormFieldEditor from './FormFieldEditor';

export default function FormBuilder({ onClose }: { onClose: () => void }) {
  const [fields, setFields] = useState<FieldConfig[]>([]);

  const addField = () => {
    const newField: FieldConfig = {
      id: uuidv4(),
      label: '',
      type: 'text',
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updated: Partial<FieldConfig>) => {
    setFields(fields.map(f => (f.id === id ? { ...f, ...updated } : f)));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const validateFields = () => {
    const errs: string[] = [];

    fields.forEach((field, index) => {
      if (!field.label.trim()) errs.push(`Field #${index + 1} is missing label`);
      if (field.type === 'number' && (field.min == null || field.max == null)) {
        errs.push(`Field #${index + 1} (Number) must have min/max`);
      }
      if ((field.type === 'text' || field.type === 'textarea') && (field.minLength == null || field.maxLength == null)) {
        errs.push(`Field #${index + 1} (${field.type}) must have min/max length`);
      }
      if ((field.type === 'select' || field.type === 'radio') && (!field.options || field.options.length < 2)) {
        errs.push(`Field #${index + 1} (${field.type}) must have at least 2 options`);
      }
    });

    alert(errs.join('\n'));
    return errs.length === 0;
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    alert('Form created! (check console)');
    onClose();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card" style={{ width: '900px', maxWidth: '95%' }}>
        <header className="modal-card-head">
          <p className="modal-card-title">Form Builder</p>
          <button className="delete" onClick={onClose}></button>
        </header>

        <section className="modal-card-body">
          {fields.map((field, index) => (
            <div className="box mb-4" key={field.id}>
              <FormFieldEditor
                field={field}
                onUpdate={(updated) => updateField(field.id, updated)}
                onDelete={() => removeField(field.id)}
              />
            </div>
          ))}

          <button className="button is-link mt-3" onClick={addField}>
            + Add Field
          </button>
        </section>

        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={handleSubmit}>Submit Form</button>
          <button className="button" onClick={onClose}>Cancel</button>
        </footer>
      </div>
    </div>
  );
}
