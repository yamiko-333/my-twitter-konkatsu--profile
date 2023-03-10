import { FC } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { IUser } from "../../models/UserDataSchema";

const GENDER_ITEM = [
  { id: "male", label: "ð¨ç·", value: 1 },
  { id: "female", label: "ð©å¥³", value: 2 },
] as const;

type Props = {
  reactHookFormReturn: UseFormReturn<IUser, any>;
};

export const Gender: FC<Props> = ({ reactHookFormReturn }) => {
  const { register, control } = reactHookFormReturn;

  return (
    <FormControl>
      <FormLabel>æ§å¥</FormLabel>
      <Controller
        control={control}
        name="gender"
        defaultValue={1}
        render={({ field, fieldState: { error } }) => (
          <>
            <RadioGroup>
              {GENDER_ITEM.map((radio) => (
                <FormControlLabel
                  {...field}
                  key={radio.value}
                  label={radio.label}
                  value={radio.value}
                  control={<Radio />}
                  {...register("gender", { required: "é¸æå¿é é ç®ã§ã" })}
                />
              ))}
            </RadioGroup>
            <FormHelperText error={!!error?.message} sx={{ ml: 0 }}>
              {error?.message}
            </FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
};

// MEMOï¼MUIã®æ©è½ãä½¿ã£ã¦ã¨ã©ã¼ã®å®è£ããããã¨ãããã®ã®ä¸æããããªãã£ãã®ã§ãreact-hook-formã®æ©è½ãä½¿ã£ã¦å®è£ãã
// Ãï¼rules={{required: {value: true, message: 'è²ã¯é¸æå¿é ã§ã'}}}
// ãï¼{...register("gender", { required: "é¸æå¿é é ç®ã§ã" })}
