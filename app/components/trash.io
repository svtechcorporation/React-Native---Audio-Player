<View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
          }}>
            <FlatList
                data={this.context.audioFiles}
                renderItem={ ({item}) => <AudioListItem file={item} /> }
                showsVerticalScrollIndicator={false}
                style={{
                  width: "100%"
                }}
            />
          </View>
          