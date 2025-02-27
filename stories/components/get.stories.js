/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

import { html } from 'lit-element';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { withWebComponentsKnobs } from 'storybook-addon-web-components-knobs';
import { withSignIn } from '../../.storybook/addons/signInAddon/signInAddon';
import { withCodeEditor } from '../../.storybook/addons/codeEditorAddon/codeAddon';
import '../../dist/es6/components/mgt-get/mgt-get';

export default {
  title: 'Components | mgt-get',
  component: 'mgt-get',
  decorators: [withA11y, withSignIn, withCodeEditor],
  parameters: {
    options: { selectedPanel: 'mgt/sign-in' },
    signInAddon: {
      test: 'test'
    }
  }
};

export const GetEmail = () => html`
  <mgt-get resource="/me/messages" version="beta" scopes="mail.read" max-pages="2">
    <template>
      <div class="email" data-for="email in value">
        <h4>
          <mgt-person person-query="{{email.sender.emailAddress.address}}" show-name person-card="hover"></mgt-person>
        </h4>
        <h3>{{ email.subject }}</h3>
        <div data-if="email.bodyPreview" class="preview" innerHtml>{{email.bodyPreview}}</div>
        <div data-else class="preview">
          email body is empty
        </div>
      </div>
    </template>
    <template data-type="loading">
      loading
    </template>
    <template data-type="error">
      {{ this }}
    </template>
  </mgt-get>

  <style>
    .email {
      box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
      padding: 10px;
      margin: 8px 4px;
      font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans, Helvetica Neue, Arial, sans-serif;
    }

    .email:hover {
      box-shadow: 0 3px 14px rgba(0, 0, 0, 0.3);
      padding: 10px;
      margin: 8px 4px;
    }

    .email h3 {
      font-size: 12px;
      margin-top: 4px;
    }

    .email h4 {
      font-size: 10px;
      margin-top: 0px;
      margin-bottom: 0px;
    }

    .email mgt-person {
      --font-size: 10px;
      --avatar-size-s: 12px;
    }

    .email .preview {
      font-size: 13px;
      text-overflow: ellipsis;
      word-wrap: break-word;
      overflow: hidden;
      max-height: 2.8em;
      line-height: 1.4em;
    }
  </style>
`;

export const ExtendingPersonCard = () => html`
  <mgt-person person-query="Isaiah" show-name show-email person-card="hover">
    <template data-type="person-card">
      <mgt-person-card inherit-details>
        <template data-type="additional-details">
          <mgt-get resource="/users/{{ person.id }}/profile" version="beta">
            <template>
              <div>
                <div data-if="positions && positions.length">
                  <h4>Work history</h4>
                  <div data-for="position in positions">
                    <b>{{ position.detail.jobTitle }}</b> ({{ position.detail.company.department }})
                  </div>
                  <hr />
                </div>
                <div data-if="projects && projects.length">
                  <h4>Project history</h4>
                  <div data-for="project in projects">
                    <b>{{ project.displayName }}</b>
                  </div>
                  <hr />
                </div>
                <div data-if="educationalActivities && educationalActivities.length">
                  <h4>Educational Activities</h4>
                  <div data-for="edu in educationalActivities">
                    <div data-if="edu.program.displayName"><b>program:</b> {{ edu.program.displayName }}</div>
                    <div data-if="edu.institution.displayName">
                      <b>Institution:</b> {{ edu.institution.displayName }}
                    </div>
                  </div>
                  <hr />
                </div>
                <div>
                  <h4>Interests</h4>
                  <span data-for="interest in interests">
                    {{ interest.displayName }}<span data-if="$index < interests.length - 1">, </span>
                  </span>
                  <hr />
                </div>
                <div data-if="languages && languages.length">
                  <h4>Languages</h4>
                  <span data-for="language in languages">
                    {{ language.displayName }}<span data-if="$index < languages.length - 1">, </span>
                  </span>
                </div>
              </div>
            </template>
          </mgt-get>
        </template>
      </mgt-person-card>
    </template>
  </mgt-person>
`;
