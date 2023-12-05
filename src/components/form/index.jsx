import { useForm } from 'react-hook-form';
import gptResponseBuilder from '../../client/gpt/index.js';
import { useState } from 'react';
import Loader from '../loader/index.jsx';
import useTokenUsage from '../../store/tokenUsageStore.js';

function DishForm({ submit }) {
  const { updateTokenUsage } = useTokenUsage();

  const [isCookTypeLoading, setCookTypeLoading] = useState();
  const [foodTypes, setFoodTypes] = useState([]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    trigger: triggerValidation,
    getValues,
  } = useForm();

  const onNextBtnClick = async () => {
    await triggerValidation();
    if (isValid) {
      setCookTypeLoading(true);

      const ingredients = getValues('ingredients');
      const { response: ingredientResponse, tokenUsage: ingredientTokenUsage } =
        await gptResponseBuilder('INGREDIENTS', ingredients, 'array');
      updateTokenUsage(ingredientTokenUsage);
      setFoodTypes(ingredientResponse);
      setCookTypeLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center bg-white py-8 px-4 rounded-lg shadow-custom"
      onSubmit={handleSubmit(submit)}
    >
      <div className="flex justify-between w-[90%]">
        <p className="text-2xl mb-6 text-wave-blue font-semibold">
          Please choose what ingredients do you have?
        </p>
      </div>
      <div className="flex flex-wrap w-[90%]">
        <label className="w-full" htmlFor="topic">
          Ingredients (Separate with a semicolon):
        </label>
        <input
          id="topic"
          type="text"
          className="w-full px-4 py-2 my-2 border-2 border-mist-gray rounded-lg bg-mist-gray bg-opacity-20 text-xl focus:outline-none focus:border-wave-blue"
          {...register('ingredients', { required: true })}
          placeholder="Enter ingredients"
        />
      </div>
      {errors.ingredients && <span>This field is required</span>}

      {foodTypes.length > 0 ? (
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 p-4">
          {foodTypes.map((foodtype) => (
            <div
              className="flex gap-2  bg-flamingo-pink p-2 rounded-lg text-white"
              key={foodtype.type}
            >
              <input
                id={foodtype.type}
                type="radio"
                key={foodtype.type}
                value={foodtype.type}
                {...register('foodType', { required: 'please choose one' })}
                className="w-6 h-6 disabled:bg-slate-400 text-white rounded-lg flex justify-center items-center gap-x-4"
              />
              <label htmlFor={foodtype.type}>{foodtype.type}</label>
            </div>
          ))}
        </div>
      ) : isCookTypeLoading ? (
        <Loader />
      ) : (
        <button
          className="w-40 h-10 hover:bg-opacity-80 bg-wave-blue mt-6 disabled:bg-slate-400 text-white rounded-lg flex justify-center items-center gap-x-4"
          type="button"
          onClick={onNextBtnClick}
        >
          Next step
        </button>
      )}
      {errors.foodType && <span>This field is required</span>}

      {foodTypes.length > 0 && (
        <button
          className="w-40 h-10 hover:bg-opacity-80 bg-wave-blue mt-6 disabled:bg-slate-400 text-white rounded-lg flex justify-center items-center gap-x-4"
          type="submit"
        >
          Get cooking!
        </button>
      )}
    </form>
  );
}

export default DishForm;
