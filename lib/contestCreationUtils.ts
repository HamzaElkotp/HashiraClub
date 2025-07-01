function handleChange(setForm: React.Dispatch<React.SetStateAction<any>>) {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? Number(value) : value;
    const keys = name.split('.');

    setForm((prev: any) => {
      if (keys.length === 1) {
        return { ...prev, [name]: parsedValue };
      }

      if (keys.length === 2) {
        const [parent, child] = keys;
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      }
      return prev;
    });
  };
}

function validateInfo(errors: string[], form: any){
  if (!form.name.trim()) errors.push("Name is required.");
  if (!form.about.trim()) errors.push("About is required.");
  if (!form.description.trim()) errors.push("Description is required.");
  if (!form.banner) errors.push("Banner is required.");
  if (!form.image) errors.push("Image is required.");
}
function validateTakePlace(errors: string[], form: any){
  if (form.isOnline === null || form.isOnline === undefined) errors.push("Contest type (online/offline) is required.");
  if (!form.category) errors.push("Category is required.");
  if (!form.regions.length) errors.push("At least one region must be selected.");
  if (form.maxContestants < 1) errors.push("Max contestants must be at least 1.");
}
function validateDates(errors: string[], form: any){
  const pub = new Date(form.publishDate);
  const reg = new Date(form.registrationEndDate);
  const start = new Date(form.startDateTime);

  if (!form.publishDate) errors.push("Publish date is required.");
  if (!form.registrationEndDate) errors.push("Registration end date is required.");
  if (!form.startDateTime) errors.push("Start date & time is required.");

  
  if (form.period?.value < 1) errors.push("Duration must be at least 1 unit.");

  if (form.publishDate && form.registrationEndDate && reg < pub)
  errors.push("Registration end date cannot be before publish date.");

  if (form.startDateTime && form.publishDate && new Date(form.startDateTime) < pub)
  errors.push("Start time cannot be before publish date.");

  if (form.startDateTime && form.registrationEndDate && new Date(form.startDateTime) < reg)
  errors.push("Start time cannot be before registration end.");
}
function validateOrganizingPlace(errors: string[], form: any){
  if (!form.organizingPlace) errors.push("You must choose if contest is internal or external.");
}
function validateTeamSetUp(errors: string[], form: any){
  if (form.minTeamSize == null || form.minTeamSize < 1)
    errors.push("Minimum team size must be 1 or more.");

  if (form.maxTeamSize == null || form.maxTeamSize < form.minTeamSize)
    errors.push("Maximum team size must be greater than or equal to minimum.");

  if (!form.teamCondition)
    errors.push("Team condition is required.");
}
function validateRateMechanism(errors: string[], form: any){
    if (form.hasPenalty === null || form.hasPenalty === undefined) errors.push("Penalty option is required.");
    if (!form.rateMethod) errors.push("Rate method is required.");
    if (!form.resultVisibility) errors.push("Result visibility option is required.");
    if (!form.resultPublishing) errors.push("Result publishing option is required.");
    if (!form.standingStyle) errors.push("Standing style option is required.");
}
function validateQAType(errors: string[], form: any){
  if (!form.questionType) errors.push("You must select a question type.");
}

type ValidatorFn = (errors: string[], form: any) => void;
const methodCall: Record<string, ValidatorFn>  = {
  validateInfo,
  validateTakePlace,
  validateDates,
  validateOrganizingPlace,
  validateTeamSetUp,
  validateRateMechanism,
  validateQAType
}


function validateContestStep(step: string, form: any): string[] {
    const errors: string[] = [];
    const validator = methodCall[step];
    if (validator) {
      validator(errors, form);
    } else {
      console.warn(`Validator for step "${step}" not found`);
    }
    return errors;
};

export {
    handleChange,
    validateContestStep,
}
