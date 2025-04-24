import os
import json

def load_dataset(path, *, debug=False):
    partial_message = " (roof only partially visible)"
    result = []
    for root, dirs, files in os.walk(os.path.join(os.getcwd(), path, '2_amount_of_panels')):
        for file in files:
            if file.endswith('.json'):
                # print("[INFO] Loading file:", file)
                with open(os.path.join(root, file), 'r') as f:
                    data = json.loads(f.read())
                    for response in data['data']['responses']:
                        for index, attachment in enumerate(response['attachments']):
                            raw_number = attachment['number_of_modules']
                            if raw_number == 'not applicable':
                                if debug:
                                    print(f"[WARN] Skipping attachment {index} of file {file} because number_of_modules is 'not applicable'")
                                continue
                            is_partial = raw_number.endswith(partial_message)
                            number = int(raw_number, 10) if not is_partial else int(raw_number[:-len(partial_message)], 10)
                            result.append({
                                'projectId': data['projectId'],
                                'imageIndex': index,
                                'numberOfModules': number,
                                'isPartial': is_partial,
                                'imagePath': os.path.join(os.getcwd(), path, 'dataset', attachment['url']),
                            })
    return result
    