'use client';
import { useState } from 'react';
import { FieldConfig, FieldType, Option } from './types';

const fieldTypes: { label: string; value: FieldType }[] = [
  { label: 'Text', value: 'text' },
  { label: 'Textarea', value: 'textarea' },
  { label: 'Number', value: 'number' },
  { label: 'Select (Multi-choice)', value: 'select' },
  { label: 'Radio Buttons', value: 'radio' },
];

export default function FormFieldEditor({
  field,
  onUpdate,
  onDelete,
}: {
  field: FieldConfig;
  onUpdate: (updated: Partial<FieldConfig>) => void;
  onDelete: () => void;
}) {
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    onUpdate({ [name]: type === 'number' ? Number(val) : val });
  };

  const handleOptionChange = (index: number, key: 'label' | 'value', value: string) => {
    const updated = [...(field.options || [])];
    updated[index][key] = value;
    onUpdate({ options: updated });
  };

  const addOption = () => {
    const updated = [...(field.options || []), { label: '', value: '' }];
    onUpdate({ options: updated });
  };

  const removeOption = (index: number) => {
    const updated = [...(field.options || [])];
    updated.splice(index, 1);
    onUpdate({ options: updated });
  };

  return (
    <>
      <div className="field is-flex is-justify-content-space-between">
        <label className="label">Field Label *</label>
        <button className="delete" onClick={onDelete}></button>
      </div>

      <div className="field">
        <input
          className="input"
          name="label"
          placeholder="Enter field label"
          value={field.label}
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label className="label">Type *</label>
        <div className="select is-fullwidth">
          <select
            name="type"
            value={field.type}
            onChange={(e) => onUpdate({ type: e.target.value as FieldType })}
          >
            {fieldTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field is-flex is-align-items-center">
        <input
          type="checkbox"
          name="required"
          className="mr-2"
          checked={field.required}
          onChange={handleChange}
        />
        <label className="label">Required?</label>
      </div>

      {/* Type-specific configs */}
      {(field.type === 'text' || field.type === 'textarea') && (
        <div className="columns">
          <div className="column">
            <label className="label">Min Length</label>
            <input
              type="number"
              className="input"
              name="minLength"
              value={field.minLength ?? ''}
              onChange={handleChange}
            />
          </div>
          <div className="column">
            <label className="label">Max Length</label>
            <input
              type="number"
              className="input"
              name="maxLength"
              value={field.maxLength ?? ''}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      {field.type === 'number' && (
        <div className="columns">
          <div className="column">
            <label className="label">Min Value</label>
            <input
              type="number"
              className="input"
              name="min"
              value={field.min ?? ''}
              onChange={handleChange}
            />
          </div>
          <div className="column">
            <label className="label">Max Value</label>
            <input
              type="number"
              className="input"
              name="max"
              value={field.max ?? ''}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      {(field.type === 'select' || field.type === 'radio') && (
        <>
          <label className="label">Options</label>
          {(field.options || []).map((opt, index) => (
            <div key={index} className="field is-flex mb-2">
              <input
                className="input mr-2"
                placeholder="Label"
                value={opt.label}
                onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
              />
              <input
                className="input mr-2"
                placeholder="Value"
                value={opt.value}
                onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
              />
              <button className="button is-danger is-small" onClick={() => removeOption(index)} type="button">
                ✕
              </button>
            </div>
          ))}
          <button className="button is-link is-small" onClick={addOption} type="button">
            + Add Option
          </button>
        </>
      )}
    </>
  );
}
