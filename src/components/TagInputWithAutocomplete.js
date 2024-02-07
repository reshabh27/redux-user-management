import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css"; // Import the styles
import { useDispatch } from "react-redux";
import { setTagVal } from "../features/user/userSlice";

const TagInputWithAutocomplete = ({ initialTags = []}) => {
  const dispatch = useDispatch();
  const [tags, setTags] = useState(initialTags);
  const [suggestions, setSuggestions] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "HTML",
    "CSS",
  ]);

  const handleTagChange = (tags) => {
    setTags(tags);
  };

  const handleAutocomplete = (input, callback) => {
    const regex = new RegExp(input, "i");
    const filteredSuggestions = suggestions.filter((suggestion) =>
      regex.test(suggestion)
    );
    callback(null, filteredSuggestions);
  };

  dispatch(setTagVal(tags));

  return (
    <div className="mb-3">
      <label htmlFor="Interests" className="form-label">
        Interests:
      </label>
      <TagsInput
        id="tags"
        className="form-control w-50 m-auto"
        value={tags}
        onChange={handleTagChange}
        inputValue=""
        addKeys={[9, 13, 32]} // Tab, Enter, Space keys to add a tag
        renderInput={(props) => (
          <input {...props} id="Interests" placeholder="Add tags" />
        )}
        renderLayout={(tagComponents, inputComponent) => (
          <div>
            {tagComponents}
            {inputComponent}
          </div>
        )}
        renderTag={({
          tag,
          key,
          disabled,
          onRemove,
          getTagDisplayValue,
          ...tagProps
        }) => (
          <span key={key} {...tagProps}>
            {getTagDisplayValue(tag)}
            {!disabled && <span onClick={() => onRemove(key)}> x </span>}
          </span>
        )}
        autocomplete={handleAutocomplete}
      />
    </div>
  );
};

export default TagInputWithAutocomplete;
