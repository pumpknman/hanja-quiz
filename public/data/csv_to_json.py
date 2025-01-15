# csv_to_json.py

import os
import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    """
    주어진 csv_file_path를 읽어서
    json_file_path로 JSON 파일을 생성합니다.
    """
    data = []
    
    # CSV 파일 읽기
    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            data.append(row)
    
    # JSON 파일로 쓰기
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        # ensure_ascii=False → 한글이 유니코드 이스케이프되지 않도록
        # indent=2 → 보기 좋게 들여쓰기
        json.dump(data, json_file, ensure_ascii=False, indent=2)

def convert_all_csv_in_same_folder():
    """
    이 파일(csv_to_json.py)과 동일한 폴더에 있는
    모든 .csv 파일을 찾아서 .json 파일로 변환합니다.
    """
    script_dir = os.path.dirname(os.path.realpath(__file__))
    
    for filename in os.listdir(script_dir):
        # .csv로 끝나는 파일만 변환
        if filename.lower().endswith('.csv'):
            csv_file_path = os.path.join(script_dir, filename)
            
            # 예: lvl1.csv → lvl1.json
            json_filename = os.path.splitext(filename)[0] + '.json'
            json_file_path = os.path.join(script_dir, json_filename)
            
            print(f'Converting: {filename} → {json_filename}')
            csv_to_json(csv_file_path, json_file_path)

if __name__ == '__main__':
    convert_all_csv_in_same_folder()
    print('모든 CSV → JSON 변환이 완료되었습니다!')
