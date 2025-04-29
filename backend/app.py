from flask import Flask, jsonify ,request
from flask_cors import CORS
import numpy as np
import pandas as pd

popular=pd.read_pickle('popular.pkl')
model=pd.read_pickle('model.pkl')
books=pd.read_pickle('books.pkl')
book_pivot=pd.read_pickle('book_pivot.pkl')

bookname=list(popular['Book-Title'].values)
author=list(popular['Book-Author'].values)
image=list(popular['Image-URL-M'].values)
votes=list(popular['num_ratings'].values)
rating=list(popular['avg_rating'].values)

item=[]
for i in range(len(bookname)):
    temp=[]
    temp.append(bookname[i])
    temp.append(author[i])
    temp.append(image[i])
    temp.append(rating[i])
    item.append(temp)


app=Flask(__name__)

CORS(app)
@app.route('/')
def popular():
    return jsonify({
        "item" : item
    })


@app.route('/books',methods=['GET'])
def search():
    search_query = request.args.get('search').replace(' ','').replace(".","")
    if search_query:
        filtered_books = books[(books['title'].str.replace(".","").str.replace(' ','').str.contains(search_query,case=False)) | (books['author'].str.replace(".","").str.replace(' ','').str.contains(search_query,case=False))].drop_duplicates(subset='title').to_dict(orient='records')
        if len(filtered_books) >30:
            modified=filtered_books[:30]
            return jsonify(modified)
        else:
            return jsonify(filtered_books)
    

@app.route('/<bookname>')
def recommend(bookname):
    if bookname not in book_pivot.index:
        return jsonify({
            "message":"This book is not so popular to recommend.Please select some other book"
        })
    def recommend_book(book_name):
        book_id = np.where(book_pivot.index == book_name)[0][0]
        distance, suggestion = model.kneighbors(book_pivot.iloc[book_id,:].values.reshape(1,-1), n_neighbors=6 )
        data=[]
        for i in suggestion[0]:
            item=[]
            temp_df = books[books['title'] == book_pivot.index[i]]
            item.extend(list(temp_df.drop_duplicates('title')['title'].values))
            item.extend(list(temp_df.drop_duplicates('title')['author'].values))
            item.extend(list(temp_df.drop_duplicates('title')['image_url'].values))
            data.append(item)
        return data
    recommend=recommend_book(bookname)
    return jsonify({
        "recommend":recommend
    })

    

if __name__=='__main__':
    app.run(debug=True)


