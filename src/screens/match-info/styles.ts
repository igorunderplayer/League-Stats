import { StyleSheet } from 'react-native'
import themes from '../../themes'
import colors from '../../colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    padding: 8,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  teamsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  team: {
    flex: 1,
    gap: 4,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#ffffff80',
  },
  button: {
    backgroundColor: '#ffffff05',
    padding: 12,
    borderRadius: 8,
  },
})

const mdStyles = StyleSheet.create({
  body: {
    color: colors.white,
  },
  heading1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 8,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 8,
  },
  heading3: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 6,
  },
  heading4: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 6,
  },
  heading5: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 4,
  },
  heading6: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 4,
  },
  hr: {
    backgroundColor: '#ffffff20',
    marginVertical: 8,
    height: 1,
  },
  strong: {
    fontWeight: 'bold',
    color: colors.white,
  },
  em: {
    fontStyle: 'italic',
    color: '#ffffff80',
  },
  s: {
    textDecorationLine: 'line-through',
    color: '#ffffff80',
  },
  blockquote: {
    backgroundColor: '#ffffff10',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.softPurple,
    paddingLeft: 8,
    paddingVertical: 8,
    marginVertical: 8,
  },
  bullet_list: {
    marginLeft: 8,
    marginVertical: 4,
  },
  ordered_list: {
    marginLeft: 8,
    marginVertical: 4,
  },
  list_item: {
    color: '#ffffff80',
    marginVertical: 2,
  },
  code_inline: {
    backgroundColor: '#ffffff10',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontFamily: 'monospace',
    color: colors.white,
  },
  code_block: {
    backgroundColor: '#ffffff10',
    borderRadius: 8,
    padding: 8,
    fontFamily: 'monospace',
    color: colors.white,
    marginVertical: 8,
  },
  fence: {
    backgroundColor: '#ffffff10',
    borderRadius: 8,
    padding: 8,
    fontFamily: 'monospace',
    color: colors.white,
    marginVertical: 8,
  },
  table: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ffffff20',
    borderRadius: 8,
  },
  thead: {
    backgroundColor: '#ffffff10',
  },
  tbody: {
    backgroundColor: 'transparent',
  },
  th: {
    color: colors.white,
    fontWeight: 'bold',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff20',
  },
  tr: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff20',
  },
  td: {
    color: '#ffffff80',
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#ffffff20',
  },
  link: {
    color: colors.softPurple,
    textDecorationLine: 'underline',
  },
  blocklink: {
    color: colors.softPurple,
    textDecorationLine: 'underline',
  },
  image: {
    marginVertical: 8,
  },
  text: {
    color: '#ffffff80',
  },
  textgroup: {
    color: '#ffffff80',
  },
  paragraph: {
    marginVertical: 6,
  },
  hardbreak: {
    height: 0,
  },
  softbreak: {
    height: 0,
  },
  pre: {
    backgroundColor: '#ffffff10',
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
  inline: {
    color: '#ffffff80',
  },
  span: {
    color: '#ffffff80',
  },
})

export { styles, mdStyles }
