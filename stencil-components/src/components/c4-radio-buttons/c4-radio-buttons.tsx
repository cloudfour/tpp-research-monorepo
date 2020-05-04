// This component is a work in progress. It should be improved from a design perspective

import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

interface Option {
  name: string;
  id: string;
}

@Component({
  tag: "c4-radio-buttons",
  styleUrl: "c4-radio-buttons.css",
  shadow: true,
})
export class C4RadioButtons {
  @Prop() optionsString?: string;
  @Prop() optionsData?: Array<any> = null;
  @Event() colorChanged: EventEmitter;
  @Prop() callback?: Function = null;
  @Prop() radioName: string;

  changeHandler(option: Option) {
    if (this.callback !== null) {
      this.callback(option);
    }
    return this.colorChanged.emit(option);
  }

  private parsedOptions(): Array<Option> {
    if (this.optionsData !== null) {
      return this.optionsData;
    }

    return JSON.parse(this.optionsString);
  }

  render() {
    return (
      <div class="options">
        {this.parsedOptions().map((option, index) => {
          const checked = index === 0;

          return (
            <label class="option" htmlFor={option.id}>
              <input
                type="radio"
                id={option.id}
                name={this.radioName}
                value={option.id}
                checked={checked}
                onClick={() => this.changeHandler(option)}
              />
              <span class="option-text">
                <span>{option.name}</span>
              </span>
            </label>
          );
        })}
      </div>
    );
  }
}
